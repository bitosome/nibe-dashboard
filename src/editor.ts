import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { entityId, roles, type Role } from './model';
import type { CardConfig, Hass } from './types';

@customElement('nibe-dashboard-editor')
export class NibeDashboardEditor extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private config?: CardConfig;
  static styles = css`
    :host{display:block;color:var(--primary-text-color);font-family:inherit}*{box-sizing:border-box}label{display:grid;gap:6px;font-size:13px;margin:12px 0}input,select,button{font:inherit;color:inherit;min-height:44px;border:1px solid var(--divider-color,#888);border-radius:10px;padding:10px;background:var(--card-background-color,#fff);max-width:100%;width:100%}input:focus-visible,select:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}.room{border:1px solid var(--divider-color,#aaa);border-radius:12px;padding:12px;margin:12px 0}.room header{display:flex;justify-content:space-between;align-items:center;gap:8px}.room header button{font-size:12px;width:auto}h3{font-size:15px;margin:20px 0 8px}p{color:var(--secondary-text-color);font-size:12px;line-height:1.6}summary{cursor:pointer;min-height:44px;padding:14px 0;font-weight:600;font-size:14px}.watch{display:flex;align-items:center;gap:10px}.watch input{min-height:24px;width:24px}@media(max-width:420px){.row{grid-template-columns:1fr}}
  `;
  setConfig(config: CardConfig) { this.config = { ...config, entities: { ...config.entities }, rooms: (config.rooms ?? []).map(r => ({ ...r })), watch_automations: [...(config.watch_automations ?? [])] }; }
  protected updated() {
    // Apply selection after option nodes exist, including unavailable mappings.
    const access = this.renderRoot.querySelector<HTMLSelectElement>('select[aria-label="Control access"]');
    if (access) access.value = String(!!this.config?.read_only);
    for (const select of this.renderRoot.querySelectorAll<HTMLSelectElement>('select[data-role]')) select.value = entityId(this.config!, select.dataset.role as Role) ?? '';
    for (const select of this.renderRoot.querySelectorAll<HTMLSelectElement>('select[data-room-index]')) select.value = this.config!.rooms![Number(select.dataset.roomIndex)].entity;
  }
  private change(patch: Partial<CardConfig>) {
    if (!this.config) return;
    this.config = { ...this.config, ...patch };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config }, bubbles: true, composed: true }));
  }
  private options(domain: string, selected?: string) {
    const ids = Object.keys(this.hass?.states ?? {}).filter(id => id.startsWith(`${domain}.`));
    if (selected && !ids.includes(selected)) ids.push(selected);
    return ids.sort().map(id => {
      const entity = this.hass?.states[id];
      const label = entity?.attributes.friendly_name ? `${entity.attributes.friendly_name} (${id})` : `${id}${entity ? '' : ' (unavailable)'}`;
      return html`<option value=${id} ?selected=${selected === id}>${label}</option>`;
    });
  }
  private field(role: Role) {
    if (!this.config) return nothing;
    const selected = entityId(this.config, role);
    return html`<label>${roles[role][0]}<select data-role=${role} aria-label=${roles[role][0]} @change=${(e: Event) => this.change({ entities: { ...this.config!.entities, [role]: (e.target as HTMLSelectElement).value || null } })}><option value="" ?selected=${!selected}>Not configured</option>${this.options(roles[role][1], selected)}</select></label>`;
  }
  protected render() {
    if (!this.config) return nothing;
    const rooms = this.config.rooms ?? [];
    const watched = this.config.watch_automations ?? [];
    const watches = [...new Set([...Object.keys(this.hass?.states ?? {}).filter(id => id.startsWith('automation.')), ...watched])].sort();
    return html`<p>One card for daily comfort and on-demand diagnostics. Default entity IDs match the NibeGW F-series integration and the optional NIBE autopilot helpers. Map renamed entities below; no setup action changes the heat pump.</p>
      <div class="row"><label>Title<input .value=${this.config.title ?? ''} placeholder="Heat pump" @change=${(e: Event) => this.change({ title: (e.target as HTMLInputElement).value || undefined })}></label><label>Subtitle<input .value=${this.config.subtitle ?? ''} placeholder="NIBE / room-aware comfort" @change=${(e: Event) => this.change({ subtitle: (e.target as HTMLInputElement).value || undefined })}></label></div>
      <label>Control access<select aria-label="Control access" @change=${(e: Event) => this.change({ read_only: (e.target as HTMLSelectElement).value === 'true' })}><option value="false" ?selected=${!this.config.read_only}>Allow helper and room-target controls</option><option value="true" ?selected=${!!this.config.read_only}>Read only</option></select></label>
      <details open><summary>Daily controls &amp; readings</summary>${(['indoor', 'outdoor', 'target', 'autopilot', 'heater_cap', 'bias', 'circuit_power', 'hot_water', 'priority', 'alarm'] as Role[]).map(role => this.field(role))}<p>Writable card controls only accept input_number/input_boolean helpers. Controller-owned pump numbers are always read-only.</p></details>
      <details><summary>Room thermostats (${rooms.length})</summary><p>Explicitly select your underfloor thermostats. Each uses its own target. Adjustments require the entity to expose min_temp, max_temp, target_temp_step and the target-temperature feature.</p>
        ${rooms.map((room, index) => html`<div class="room"><header><strong>Room ${index + 1}</strong><button aria-label=${`Remove room ${index + 1}`} @click=${() => this.change({ rooms: rooms.filter((_, i) => i !== index) })}>Remove</button></header><label>Thermostat<select data-room-index=${index} aria-label=${`Room ${index + 1} thermostat`} @change=${(e: Event) => { const id = (e.target as HTMLSelectElement).value; if (!rooms.some((r, i) => i !== index && r.entity === id)) this.change({ rooms: rooms.map((r, i) => i === index ? { ...r, entity: id } : r) }); else this.requestUpdate(); }}>${this.options('climate', room.entity)}</select></label><label>Display name<input aria-label=${`Room ${index + 1} name`} .value=${room.name ?? ''} placeholder="Use entity name" @change=${(e: Event) => this.change({ rooms: rooms.map((r, i) => i === index ? { ...r, name: (e.target as HTMLInputElement).value || undefined } : r) })}></label></div>`)}
        <label>Add a room<select aria-label="Add a room" .value=${''} @change=${(e: Event) => { const select = e.target as HTMLSelectElement; if (select.value && !rooms.some(r => r.entity === select.value)) this.change({ rooms: [...rooms, { entity: select.value }] }); select.value = ''; }}><option value="">Choose thermostat</option>${Object.keys(this.hass?.states ?? {}).filter(id => id.startsWith('climate.') && !rooms.some(r => r.entity === id)).sort().map(id => html`<option value=${id}>${String(this.hass!.states[id].attributes.friendly_name ?? id)}</option>`)}</select></label>
      </details>
      <details><summary>Hot water &amp; pump diagnostics</summary>${(Object.keys(roles) as Role[]).filter(role => !['indoor', 'outdoor', 'target', 'autopilot', 'heater_cap', 'bias', 'circuit_power', 'hot_water', 'priority', 'alarm'].includes(role)).map(role => this.field(role))}</details>
      <details><summary>Controller health &amp; history</summary><p>Watch the controller automations to warn if any are off or unavailable. This does not enable, disable or create automations.</p>${watches.map(id => html`<label class="watch"><input type="checkbox" aria-label=${`Watch ${id}`} .checked=${watched.includes(id)} @change=${(e: Event) => this.change({ watch_automations: (e.target as HTMLInputElement).checked ? [...watched, id] : watched.filter(value => value !== id) })}>${String(this.hass?.states[id]?.attributes.friendly_name ?? id)}</label>`)}<label>History hours (1-168)<input type="number" min="1" max="168" step="1" .value=${String(this.config.history_hours ?? 24)} @change=${(e: Event) => { const value = Number((e.target as HTMLInputElement).value); if (Number.isInteger(value) && value >= 1 && value <= 168) this.change({ history_hours: value }); }}></label></details>`;
  }
}
