import { LitElement, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { designTokens } from './shared/design-tokens';
import { buildGlow } from './shared/glow';
import { cardStyles } from './styles';
import { available, connected, controlRoles, entityId, formatEntity, nextNumber, numeric, priority, roles, validateConfig, type ControlRole, type Role } from './model';
import type { CardConfig, Entity, Hass, HistoryCard, Room } from './types';

type Page = 'home' | 'rooms' | 'history' | 'details' | 'water' | 'settings';
interface Pending { id: string; expected: number | string; attribute?: string; accepted: boolean; timer?: ReturnType<typeof setTimeout>; }

@customElement('nibe-dashboard')
export class NibeDashboard extends LitElement {
  static styles = [designTokens, cardStyles];
  @property({ attribute: false }) hass?: Hass;
  @state() private config?: CardConfig;
  @state() private page: Page = 'home';
  @state() private feedback = '';
  @state() private failed = false;
  @state() private pending?: Pending;
  @state() private histories: HistoryCard[] = [];
  @state() private historyError = '';
  private historyLoading = false;
  private generation = 0;

  setConfig(config: CardConfig) {
    this.config = validateConfig(config);
    this.cancelPending();
    this.generation++;
    this.histories = [];
    this.historyLoading = false;
    this.historyError = '';
    this.feedback = '';
  }
  getCardSize() { return this.page === 'home' ? 8 : 11; }
  getGridOptions() { return { columns: 12, min_columns: 6, rows: 'auto' }; }
  static async getConfigElement() { await import('./editor'); return document.createElement('nibe-dashboard-editor'); }
  static getStubConfig() { return { type: 'custom:nibe-dashboard', title: 'Heat pump', rooms: [] }; }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.cancelPending();
    this.generation++;
    this.historyLoading = false;
  }
  protected updated(changed: PropertyValues) {
    if (changed.has('hass')) {
      this.acknowledge();
      for (const card of this.histories) card.hass = this.hass;
    }
    if (this.page === 'history' && !this.histories.length && !this.historyLoading && !this.historyError) void this.loadHistory();
  }
  private roleId(role: Role) { return this.config ? entityId(this.config, role) : undefined; }
  private entity(role: Role): Entity | undefined { const id = this.roleId(role); return id ? this.hass?.states[id] : undefined; }
  private value(role: Role, digits = 1) { return this.roleId(role) ? formatEntity(this.entity(role), digits) : 'Not configured'; }
  private cancelPending() { if (this.pending?.timer) clearTimeout(this.pending.timer); this.pending = undefined; }
  private canWrite(id?: string) { return !this.config?.read_only && connected(this.hass) && !this.pending && !!id && available(this.hass?.states[id]); }
  private acknowledge() {
    const p = this.pending;
    if (!p?.accepted) return;
    const e = this.hass?.states[p.id];
    if (!available(e)) return;
    const actual = p.attribute ? e.attributes[p.attribute] : e.state;
    const matches = typeof p.expected === 'number' ? numeric(actual) !== undefined && Math.abs(Number(actual) - p.expected) < 1e-5 : actual === p.expected;
    if (matches) {
      this.cancelPending();
      this.feedback = 'Setting updated in Home Assistant. Pump response may take time.';
      this.failed = false;
    }
  }
  private async command(id: string, domain: string, action: string, data: Record<string, unknown>, expected: number | string, attribute?: string) {
    if (!this.canWrite(id) || !this.hass) return;
    const p: Pending = { id, expected, attribute, accepted: false };
    this.pending = p;
    this.failed = false;
    this.feedback = 'Sending setting to Home Assistant...';
    p.timer = setTimeout(() => {
      if (this.pending !== p) return;
      this.cancelPending();
      this.feedback = 'No confirmation received. Check the current setting before trying again.';
      this.failed = true;
    }, 15000);
    try {
      await this.hass.callService(domain, action, { entity_id: id, ...data });
      if (this.pending !== p) return;
      p.accepted = true;
      this.feedback = 'Request accepted. Waiting for the entity to update...';
      this.acknowledge();
    } catch (error) {
      if (this.pending !== p) return;
      this.cancelPending();
      this.failed = true;
      this.feedback = `Setting failed: ${error instanceof Error ? error.message : 'Home Assistant rejected the request'}`;
    }
  }
  private adjust(role: Exclude<ControlRole, 'autopilot'>, direction: number) {
    if (!controlRoles.has(role)) return;
    const id = this.roleId(role);
    const next = nextNumber(this.entity(role), direction);
    if (id?.startsWith('input_number.') && next !== undefined) void this.command(id, 'input_number', 'set_value', { value: next }, next);
  }
  private toggleAutopilot() {
    const id = this.roleId('autopilot');
    const state = this.entity('autopilot')?.state;
    if (!id?.startsWith('input_boolean.') || !['on', 'off'].includes(state ?? '')) return;
    const next = state === 'on' ? 'off' : 'on';
    void this.command(id, 'input_boolean', `turn_${next}`, {}, next);
  }
  private adjustRoom(room: Room, direction: number) {
    if (!this.config?.rooms?.some(r => r.entity === room.entity)) return;
    const entity = this.hass?.states[room.entity];
    if (entity?.state === 'off') return;
    const next = nextNumber(entity, direction, true);
    if (next !== undefined) void this.command(room.entity, 'climate', 'set_temperature', { temperature: next }, next, 'temperature');
  }
  private moreInfo(id?: string) {
    // Pump register controls stay read-only, including their more-info affordance.
    if (!id || !/^(sensor|binary_sensor|climate)\./.test(id) || !this.hass?.states[id]) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
  }
  private show(page: Page) { this.page = page; }
  private stepper(role: Exclude<ControlRole, 'autopilot'>) {
    const entity = this.entity(role);
    const writable = this.canWrite(this.roleId(role));
    return html`<div class="stepper" aria-label=${roles[role][0]}>
      <button data-adjust=${`${role}-down`} aria-label=${`Decrease ${roles[role][0]}`} ?disabled=${!writable || nextNumber(entity, -1) === undefined} @click=${() => this.adjust(role, -1)}>&minus;</button>
      <output>${available(entity) && numeric(entity.state) !== undefined ? entity.state : '--'}</output>
      <button data-adjust=${`${role}-up`} aria-label=${`Increase ${roles[role][0]}`} ?disabled=${!writable || nextNumber(entity, 1) === undefined} @click=${() => this.adjust(role, 1)}>+</button>
    </div>`;
  }
  private notices() {
    const alarm = this.entity('alarm');
    const code = available(alarm) ? numeric(alarm.state) : undefined;
    const broken = (this.config?.watch_automations ?? []).filter(id => this.hass?.states[id]?.state !== 'on');
    return html`${!connected(this.hass) ? html`<div class="notice error" role="alert"><strong>Home Assistant disconnected</strong>Readings may be out of date. Controls are paused.</div>` : nothing}
      ${this.roleId('alarm') && code === undefined ? html`<div class="notice" role="status"><strong>Alarm status unavailable</strong>Check the pump display. Missing telemetry is not an all-clear.</div>` : nothing}
      ${code !== undefined && code !== 0 ? html`<div class="notice error" role="alert"><strong>${code === 181 ? 'Periodic hot-water boost failed' : `NIBE alarm ${code}`}</strong>${code === 181 ? 'Alarm 181. A successful hygiene cycle has not been confirmed. Check the pump and the cause of the failure.' : 'Check the pump display and investigate the cause. This card will not reset the alarm.'}</div>` : nothing}
      ${this.entity('periodic_enabled')?.state === 'off' ? html`<div class="notice" role="status"><strong>Periodic hot-water boost is disabled</strong>Review the hygiene schedule on the pump.</div>` : nothing}
      ${broken.length ? html`<div class="notice" role="status"><strong>Controller needs attention</strong>${broken.map(id => String(this.hass?.states[id]?.attributes.friendly_name ?? id)).join(', ')}: off or unavailable. Autopilot master alone does not prove the controllers are running.</div>` : nothing}`;
  }
  private home() {
    const status = priority(this.entity('priority'));
    const indoor = this.entity('indoor');
    const n = available(indoor) ? numeric(indoor.state) : undefined;
    const glow = buildGlow({ weak: 'color-mix(in srgb,var(--status-heat-color) 7%,transparent)', strong: 'color-mix(in srgb,var(--status-heat-color) 10%,transparent)' }, 'static', status.tone === 'heat');
    const master = this.entity('autopilot');
    return html`<div class="tile-wrap"><div class="glow-under" style=${glow.style}>${glow.overlay}</div><section class="surface comfort">
      <div class="comfort-top"><span class="eyebrow">Inside</span>${this.config?.read_only ? html`<span class="chip">Read only</span>` : nothing}</div>
      <div class="reading"><strong class=${n === undefined ? 'missing' : ''}>${n === undefined ? 'Unavailable' : n.toFixed(1)}</strong>${n !== undefined ? html`<span>${String(indoor?.attributes.unit_of_measurement ?? '')}</span>` : nothing}</div>
      ${this.roleId('target') ? html`<div class="comfort-footer"><div class="setting-copy"><strong>Comfort target</strong><small>Autopilot reference</small></div>${this.stepper('target')}</div>` : nothing}
    </section></div>
    <div class="metrics">
      <button class="surface metric" data-page="water" @click=${() => this.show('water')}><span class="metric-top"><ha-icon icon="mdi:water-thermometer"></ha-icon><ha-icon class="arrow" icon="mdi:chevron-right"></ha-icon></span><span><strong>${this.value('hot_water')}</strong><small>Hot water</small></span></button>
      <button class="surface metric" data-page="details" @click=${() => this.show('details')}><span class="metric-top"><ha-icon icon="mdi:flash-outline"></ha-icon><ha-icon class="arrow" icon="mdi:chevron-right"></ha-icon></span><span><strong>${this.value('circuit_power', 2)}</strong><small>Electrical input</small></span></button>
    </div>
    ${this.roleId('autopilot') ? html`<div class="setting-row autopilot"><div class="setting-copy"><strong>Autopilot</strong><small>${master?.state === 'on' ? 'Room-aware heat control' : master?.state === 'off' ? 'Paused; NIBE still manages the heat pump' : 'Helper unavailable; check configuration'}</small></div><div class="switch-hit"><button class="switch" role="switch" data-action="autopilot" aria-label="Autopilot" aria-checked=${master?.state === 'on'} ?disabled=${!this.canWrite(this.roleId('autopilot')) || !['on', 'off'].includes(master?.state ?? '')} @click=${this.toggleAutopilot}><span></span></button></div></div>` : nothing}`;
  }
  private roomCard(room: Room) {
    const entity = this.hass?.states[room.entity];
    const valid = available(entity);
    const heating = valid && entity.attributes.hvac_action === 'heating';
    const current = valid ? numeric(entity.attributes.current_temperature) : undefined;
    const target = valid ? numeric(entity.attributes.temperature) : undefined;
    const name = room.name ?? String(entity?.attributes.friendly_name ?? room.entity);
    const enabled = this.canWrite(room.entity) && entity?.state !== 'off';
    return html`<section class="surface room ${heating ? 'heating' : ''}" data-room=${room.entity}><div class="room-top"><span class="room-title">${name}</span><span class="room-temp">${current === undefined ? '--' : `${current.toFixed(1)}\u00b0`}</span></div><div class="comfort-footer"><span class="room-state"><span class="dot"></span>${!valid ? 'Unavailable' : heating ? 'Heat requested' : entity.state === 'off' ? 'Off' : entity.attributes.hvac_action === 'idle' ? 'Satisfied' : String(entity.attributes.hvac_action ?? 'State unknown')}</span><div class="stepper"><button data-room-adjust="down" aria-label=${`Decrease ${name} target`} ?disabled=${!enabled || nextNumber(entity, -1, true) === undefined} @click=${() => this.adjustRoom(room, -1)}>&minus;</button><output aria-label=${`${name} target`}>${target === undefined ? '--' : target}</output><button data-room-adjust="up" aria-label=${`Increase ${name} target`} ?disabled=${!enabled || nextNumber(entity, 1, true) === undefined} @click=${() => this.adjustRoom(room, 1)}>+</button></div></div></section>`;
  }
  private roomsPage() {
    return html`<div class="section-title"><h2>Room comfort</h2></div><p class="hint">Each room keeps its own target. A heat request indicates relay demand, not confirmed valve position or water flow.</p><div class="rooms">${this.config?.rooms?.map(room => this.roomCard(room))}</div>${!this.config?.rooms?.length ? html`<p class="hint">Choose your room thermostats in the card editor to show them here. No rooms are discovered or controlled automatically.</p>` : nothing}`;
  }
  private row(role: Role) {
    if (!this.roleId(role)) return nothing;
    const id = this.roleId(role)!;
    const info = /^(sensor|binary_sensor)\./.test(id) && !!this.entity(role);
    const content = html`<span>${roles[role][0]}</span><b>${this.value(role)}</b>`;
    return info ? html`<button class="data-row" @click=${() => this.moreInfo(id)} aria-label=${`${roles[role][0]}: ${this.value(role)}. Open history`}>${content}</button>` : html`<div class="data-row">${content}</div>`;
  }
  private group(title: string, keys: Role[]) {
    if (!keys.some(role => this.roleId(role))) return nothing;
    return html`<section class="surface group"><h3>${title}</h3><div class="rows">${keys.map(role => this.row(role))}</div></section>`;
  }
  private waterPage() {
    return html`<div class="section-title"><h2>Hot water</h2><button class="text-button" @click=${() => this.show('history')}>View history</button></div>
      ${this.group('Cylinder', ['hot_water', 'tank_top'])}
      ${this.group('Periodic boost', ['periodic_enabled', 'periodic_interval', 'periodic_stop'])}
      <p class="hint">These are readings and settings, not proof of a completed hygiene cycle. A hot tank top or no active alarm does not confirm success. Verify completion on the pump.</p>
      ${this.group('Available assistance', ['heater_permission', 'heater_power', 'allowance'])}
      <p class="hint">Heater permission is a limit, not a request to consume that power. NIBE controls the hot-water cycle. This card does not change its schedule, temperatures or high-power mode.</p>`;
  }
  private detailsPage() {
    return html`<div class="section-title"><h2>Behind the scenes</h2><span class="chip">Read only</span></div>
      ${this.group('Electrical input', ['circuit_power', 'compressor_power', 'heater_power', 'heater_permission', 'allowance', 'mains_fresh'])}
      <p class="hint">Whole-circuit input includes auxiliaries. Compressor input is only part of that total. Produced heat and COP are not inferred from electrical input; this setup has no verified thermal measurement.</p>
      ${this.group('Heat pump', ['mode', 'frequency', 'frequency_limit', 'ready_zones'])}
      <details><summary>Heating circuit &amp; source</summary>${this.group('Heating', ['supply', 'return', 'supply_target', 'supply_ceiling', 'offset', 'degree_minutes', 'pump_speed'])}${this.group('Ground source', ['brine_in', 'brine_out', 'brine_speed'])}<p class="hint">The supply setting is a target ceiling, not a physical temperature cutoff. A frequency cap is permission, not actual speed.</p></details>
      <details><summary>Protection &amp; controller status</summary>${this.group('Protection', ['alarm', 'hot_gas', 'condenser', 'warm_guard', 'global_hold', 'condenser_hold'])}<p class="hint">Hold timestamps are shown as reported by Home Assistant. Condenser space-heating holds and global fault holds have different scope; neither is hardware protection.</p>${(this.config?.watch_automations ?? []).map(id => html`<div class="data-row"><span>${String(this.hass?.states[id]?.attributes.friendly_name ?? id)}</span><b>${this.hass?.states[id]?.state ?? 'Unavailable'}</b></div>`)}</details>`;
  }
  private settingsPage() {
    return html`<div class="section-title"><h2>Comfort settings</h2></div><section class="surface group settings">
      ${this.roleId('heater_cap') ? html`<div class="setting-row"><div class="setting-copy"><strong>Heater allowance</strong><small>User cap, in ${String(this.entity('heater_cap')?.attributes.unit_of_measurement ?? 'kW')}. Electrical limits still apply.</small></div>${this.stepper('heater_cap')}</div>` : nothing}
      ${this.roleId('bias') ? html`<div class="setting-row"><div class="setting-copy"><strong>Heating trim</strong><small>Manual bias for the room-aware controller.</small></div>${this.stepper('bias')}</div>` : nothing}
      </section><p class="hint">The house target is an autopilot reference, not a command to set every room to the same temperature. Room targets are separate.</p><p class="hint">Compressor caps, curve offset and heater permission stay under automation ownership. Operating mode, periodic boost and safety settings remain on the pump.</p><p class="hint">Unavailable controls require an available helper with numeric minimum, maximum and step. In read-only mode all card commands are disabled.</p>`;
  }
  private async loadHistory() {
    if (!this.config || !this.hass || !this.isConnected) return;
    this.historyLoading = true;
    const generation = this.generation;
    try {
      if (!window.loadCardHelpers) throw new Error('Home Assistant history cards are not available in this preview. Open this card in a dashboard to view recorded history.');
      const helpers = await window.loadCardHelpers();
      if (generation !== this.generation || !this.isConnected) return;
      const groups: [string, Role[]][] = [['Temperatures', ['indoor', 'hot_water', 'tank_top']], ['Electrical input', ['circuit_power', 'compressor_power', 'heater_power']], ['Compressor', ['frequency']]];
      this.histories = groups.flatMap(([title, keys]) => {
        const entities = keys.map(role => ({ entity: this.roleId(role), name: roles[role][0] })).filter(e => e.entity && this.hass?.states[e.entity]);
        if (!entities.length) return [];
        const card = helpers.createCardElement({ type: 'history-graph', title, hours_to_show: this.config!.history_hours ?? 24, entities });
        card.hass = this.hass;
        return [card];
      });
      if (!this.histories.length) this.historyError = 'No configured history entities are available.';
    } catch (error) {
      if (generation === this.generation) this.historyError = error instanceof Error ? error.message : 'History could not be loaded.';
    } finally {
      if (generation === this.generation) { this.historyLoading = false; this.requestUpdate(); }
    }
  }
  private historyPage() {
    return html`<div class="section-title"><h2>Recent history</h2><span class="chip">${this.config?.history_hours ?? 24} hours</span></div><p class="hint">Recorded by Home Assistant. Gaps mean missing data, not zero. Tap a sensor in Details for its full history.</p><div class="history">${this.histories}</div>${this.historyError ? html`<p class="hint">${this.historyError}</p><button class="text-button" @click=${() => { this.historyError = ''; }}>Try again</button>` : !this.histories.length ? html`<p class="hint">Loading history...</p>` : nothing}`;
  }
  protected render() {
    if (!this.config) return nothing;
    const status = priority(this.entity('priority'));
    const pages: [Page, string, string][] = [['home', 'Home', 'mdi:home-outline'], ['rooms', 'Rooms', 'mdi:floor-plan'], ['history', 'History', 'mdi:chart-timeline-variant'], ['details', 'Details', 'mdi:tune-variant']];
    return html`<ha-card><div class="outer"><div class="root">
      <header class="top"><span class="brand"><ha-icon icon="mdi:heat-pump-outline"></ha-icon></span><div class="identity"><h1>${this.config.title ?? 'Heat pump'}</h1><div class="subtitle">${this.config.subtitle ?? 'NIBE / room-aware comfort'}</div></div><button class="icon-button" data-page="settings" aria-label="Comfort settings" aria-pressed=${this.page === 'settings'} @click=${() => this.show(this.page === 'settings' ? 'home' : 'settings')}><ha-icon icon="mdi:cog-outline"></ha-icon></button></header>
      <div class="status-line ${status.tone}"><span class="dot"></span><span>${status.label}</span>${this.roleId('outdoor') ? html`<span class="outside">Outside ${this.value('outdoor')}</span>` : nothing}</div>
      ${this.notices()}
      <main class="panel" aria-label=${`${this.page} panel`}>${this.page === 'home' ? this.home() : this.page === 'rooms' ? this.roomsPage() : this.page === 'water' ? this.waterPage() : this.page === 'settings' ? this.settingsPage() : this.page === 'details' ? this.detailsPage() : this.historyPage()}</main>
      ${this.feedback ? html`<p class="feedback ${this.failed ? 'error' : ''}" role=${this.failed ? 'alert' : 'status'}>${this.feedback}</p>` : nothing}
      <nav aria-label="Heat pump sections">${pages.map(([page, label, icon]) => html`<button data-nav=${page} aria-current=${this.page === page || (page === 'home' && this.page === 'water') ? 'page' : 'false'} @click=${() => this.show(page)}><ha-icon icon=${icon}></ha-icon>${label}</button>`)}</nav>
    </div></div></ha-card>`;
  }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some(card => card.type === 'nibe-dashboard')) window.customCards.push({ type: 'nibe-dashboard', name: 'NIBE Dashboard', description: 'Heat-pump comfort, hot water and clear diagnostics. Space Hub design, automation-owned controls.', preview: true });
