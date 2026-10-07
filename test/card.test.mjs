import assert from 'node:assert/strict';
import { after, afterEach, test, mock } from 'node:test';
import { Window } from 'happy-dom';
import { mockStates, mockConfig } from '../preview/fixtures.mjs';

const browser = new Window({ url: 'http://card.test/' });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'ShadowRoot', 'Document', 'CSSStyleSheet', 'customElements', 'Event', 'CustomEvent', 'MutationObserver', 'Node', 'HTMLInputElement', 'HTMLSelectElement']) Object.defineProperty(globalThis, key, { configurable: true, value: key === 'window' ? browser : browser[key] });
await import('../dist/nibe-dashboard.js');
const root = card => card.shadowRoot;
const query = (card, selector) => root(card).querySelector(selector);
const text = card => root(card).textContent;
const state = (value, attributes = {}) => ({ state: String(value), attributes });
async function settle(card) { await card.updateComplete; await Promise.resolve(); await card.updateComplete; }
async function fixture({ config = {}, states = {}, service, online = true } = {}) {
  const calls = [];
  const card = document.createElement('nibe-dashboard');
  card.setConfig({ ...structuredClone(mockConfig), ...config });
  card.hass = { connected: online, states: { ...mockStates(), ...states }, async callService(domain, action, data) { calls.push({ domain, action, data }); return service?.(domain, action, data); } };
  document.body.append(card);
  await settle(card);
  return { card, calls };
}
async function change(card, patch) { card.hass = { ...card.hass, states: { ...card.hass.states, ...patch } }; await settle(card); }
async function nav(card, page) { query(card, `[data-nav="${page}"]`).click(); await settle(card); }
async function page(card, page) { query(card, `[data-page="${page}"]`).click(); await settle(card); }
afterEach(() => { for (const child of [...document.body.children]) child.remove(); delete window.loadCardHelpers; mock.timers.reset(); });
after(async () => { await browser.happyDOM.abort(); browser.close(); });

test('registers HACS picker metadata and supports standard HA layout APIs', async () => {
  const { card } = await fixture();
  assert.ok(window.customCards.some(c => c.type === 'nibe-dashboard'));
  assert.equal(card.getGridOptions().rows, 'auto');
  assert.equal(card.getCardSize(), 8);
  assert.equal(customElements.get('nibe-dashboard').getStubConfig().type, 'custom:nibe-dashboard');
});
test('daily view is compact and only opening pages never writes', async () => {
  const { card, calls } = await fixture();
  assert.match(text(card), /22\.3/);
  assert.match(text(card), /0\.86 kW/);
  assert.doesNotMatch(query(card, 'main').textContent, /Degree minutes|Condenser|COP/);
  await page(card, 'water'); await nav(card, 'rooms'); await nav(card, 'details'); await page(card, 'settings');
  assert.equal(calls.length, 0);
});
test('rejects raw pump register targets and invalid config', () => {
  const card = document.createElement('nibe-dashboard');
  for (const config of [
    { entities: { target: 'number.heat_offset_s1_47011' } },
    { entities: { autopilot: 'switch.periodic_hw_47050' } },
    { entities: { invalid: 'sensor.foo' } }, { rooms: [{ entity: 'switch.room' }] },
    { rooms: [{ entity: 'climate.room' }, { entity: 'climate.room' }] },
    { history_hours: 0 }, { history_hours: 2.5 }, { history_hours: 1000 },
    { watch_automations: ['switch.test'] }, { read_only: 'false' }, { entities: [] },
  ]) assert.throws(() => card.setConfig({ type: 'custom:nibe-dashboard', ...config }));
});
test('null mappings hide controls without silently restoring defaults', async () => {
  const { card } = await fixture({ config: { entities: { target: null, autopilot: null, outdoor: null } } });
  assert.equal(query(card, '[data-adjust="target-up"]'), null);
  assert.equal(query(card, '[data-action="autopilot"]'), null);
  assert.doesNotMatch(text(card), /Outside/);
});
test('target increment writes only its helper and waits for entity acknowledgement', async () => {
  const { card, calls } = await fixture();
  query(card, '[data-adjust="target-up"]').click(); await settle(card);
  assert.deepEqual(calls, [{ domain: 'input_number', action: 'set_value', data: { entity_id: 'input_number.indoor_target_temperature', value: 23 } }]);
  assert.equal(query(card, '[data-adjust="target-up"]').disabled, true);
  assert.match(text(card), /Waiting for the entity/);
  query(card, '[data-adjust="target-up"]').click(); assert.equal(calls.length, 1);
  await change(card, { 'sensor.unrelated': state(4) });
  assert.equal(query(card, '[data-adjust="target-up"]').disabled, true);
  await change(card, { 'input_number.indoor_target_temperature': state(23, { min: 18, max: 30, step: .5 }) });
  assert.equal(query(card, '[data-adjust="target-up"]').disabled, false);
  assert.match(text(card), /Setting updated in Home Assistant/);
});
test('state arriving before service response does not prematurely confirm', async () => {
  let resolve;
  const { card } = await fixture({ service: () => new Promise(r => { resolve = r; }) });
  query(card, '[data-adjust="target-up"]').click(); await settle(card);
  await change(card, { 'input_number.indoor_target_temperature': state(23, { min: 18, max: 30, step: .5 }) });
  assert.match(text(card), /Sending setting/);
  resolve(); await settle(card);
  assert.match(text(card), /Setting updated in Home Assistant/);
});
test('autopilot toggle is explicit and does not toggle an automation or pump', async () => {
  const { card, calls } = await fixture();
  query(card, '[data-action="autopilot"]').click(); await settle(card);
  assert.deepEqual(calls, [{ domain: 'input_boolean', action: 'turn_off', data: { entity_id: 'input_boolean.nibe_autopilot_state' } }]);
});
test('heater allowance and trim use separate input_number helpers', async () => {
  const { card, calls } = await fixture();
  await page(card, 'settings');
  query(card, '[data-adjust="heater_cap-down"]').click(); await settle(card);
  assert.deepEqual(calls[0], { domain: 'input_number', action: 'set_value', data: { entity_id: 'input_number.nibe_max_add_heat_kw', value: 2.5 } });
  await change(card, { 'input_number.nibe_max_add_heat_kw': state(2.5, { min: 0, max: 6, step: .5 }) });
  query(card, '[data-adjust="bias-down"]').click(); await settle(card);
  assert.equal(calls[1].data.entity_id, 'input_number.nibe_heat_bias');
  assert.equal(calls[1].data.value, -.5);
});
test('bounds clamp the final step and disable at both endpoints', async () => {
  const { card, calls } = await fixture({ states: { 'input_number.indoor_target_temperature': state(29.8, { min: 18, max: 30, step: .5 }) } });
  query(card, '[data-adjust="target-up"]').click(); await settle(card);
  assert.equal(calls[0].data.value, 30);
  await change(card, { 'input_number.indoor_target_temperature': state(30, { min: 18, max: 30, step: .5 }) });
  assert.equal(query(card, '[data-adjust="target-up"]').disabled, true);
  await change(card, { 'input_number.indoor_target_temperature': state(18, { min: 18, max: 30, step: .5 }) });
  assert.equal(query(card, '[data-adjust="target-down"]').disabled, true);
});
test('malformed bounds and unavailable numeric values disable writes', async () => {
  for (const entity of [state('unavailable'), state('unknown'), state(''), state('NaN'), state('Infinity'), state(22, { min: 18, max: 30 }), state(22, { min: null, max: 30, step: .5 }), state(22, { min: 18, max: 30, step: 0 }), state(35, { min: 18, max: 30, step: .5 })]) {
    const { card, calls } = await fixture({ states: { 'input_number.indoor_target_temperature': entity } });
    assert.equal(query(card, '[data-adjust="target-up"]').disabled, true);
    query(card, '[data-adjust="target-up"]').click(); assert.equal(calls.length, 0);
    card.remove();
  }
});
test('unavailable sensor readings do not become zero', async () => {
  const { card } = await fixture({ states: { 'sensor.home_temperature_average': state('unavailable'), 'sensor.nibe_circuit_input_power_kw': state('unknown') } });
  assert.match(query(card, '.reading').textContent, /Unavailable/);
  assert.match(query(card, '[data-page="details"]').textContent, /Unavailable/);
  assert.doesNotMatch(query(card, '[data-page="details"]').textContent, /0 kW/);
});
test('offline and read-only modes disable every command without hiding telemetry', async () => {
  for (const options of [{ online: false }, { config: { read_only: true } }]) {
    const { card, calls } = await fixture(options);
    assert.equal(query(card, '[data-adjust="target-up"]').disabled, true);
    assert.equal(query(card, '[data-action="autopilot"]').disabled, true);
    await nav(card, 'rooms');
    assert.ok([...root(card).querySelectorAll('[data-room-adjust]')].every(b => b.disabled));
    await page(card, 'settings');
    assert.ok([...root(card).querySelectorAll('[data-adjust]')].every(b => b.disabled));
    assert.equal(calls.length, 0); card.remove();
  }
});
test('connection.connected=false is also treated as offline', async () => {
  const { card } = await fixture();
  card.hass = { ...card.hass, connection: { connected: false } }; await settle(card);
  assert.equal(query(card, '[data-action="autopilot"]').disabled, true);
  assert.match(text(card), /Home Assistant disconnected/);
});
test('alarm 181 remains prominent on every page and no reset is sent', async () => {
  const { card, calls } = await fixture({ states: { 'sensor.alarm_45001': state(181) } });
  for (const value of ['home', 'rooms', 'details', 'history']) {
    await nav(card, value);
    assert.match(query(card, '[role="alert"]').textContent, /Periodic hot-water boost failed/);
    assert.match(query(card, '[role="alert"]').textContent, /not been confirmed/);
  }
  assert.equal(calls.length, 0);
});
test('zero alarm does not claim a completed periodic cycle', async () => {
  const { card } = await fixture(); await page(card, 'water');
  assert.match(text(card), /no active alarm does not confirm success/);
  assert.doesNotMatch(text(card), /Hygiene complete|Disinfection successful/);
});
test('unknown alarms, periodic boost off and stopped controllers warn', async () => {
  const { card } = await fixture({ states: { 'sensor.alarm_45001': state('unavailable'), 'switch.periodic_hw_47050': state('off'), 'automation.heat_controller': state('off') } });
  assert.match(text(card), /Alarm status unavailable/);
  assert.match(text(card), /Periodic hot-water boost is disabled/);
  assert.match(text(card), /Controller needs attention/);
});
test('priority supports HEAT, HEATING and DHW without mistaking standby for active heating', async () => {
  const { card } = await fixture();
  for (const [raw, label] of [['HEAT', 'Heating your home'], ['HEATING', 'Heating your home'], ['HOT WATER', 'Heating hot water'], ['OFF', 'On standby'], ['unknown', 'Priority unavailable']]) {
    await change(card, { 'sensor.prio_43086': state(raw) });
    assert.ok(query(card, '.status-line').textContent.includes(label));
  }
});
test('room adjustments preserve individual targets and never switch mode', async () => {
  const { card, calls } = await fixture(); await nav(card, 'rooms');
  query(card, '[data-room="climate.bedroom"] [data-room-adjust="up"]').click(); await settle(card);
  assert.deepEqual(calls, [{ domain: 'climate', action: 'set_temperature', data: { entity_id: 'climate.bedroom', temperature: 21.5 } }]);
  assert.match(text(card), /relay demand, not confirmed valve position/);
});
test('off, unsupported and incomplete thermostats cannot be adjusted', async () => {
  for (const entity of [state('off', { min_temp: 10, max_temp: 30, target_temp_step: .5, temperature: 21, supported_features: 1 }), state('heat', { min_temp: 10, max_temp: 30, temperature: 21, supported_features: 1 }), state('heat', { min_temp: 10, max_temp: 30, target_temp_step: .5, temperature: 21, supported_features: 0 })]) {
    const { card } = await fixture({ states: { 'climate.bedroom': entity } }); await nav(card, 'rooms');
    assert.equal(query(card, '[data-room="climate.bedroom"] [data-room-adjust="up"]').disabled, true); card.remove();
  }
});
test('service failures are visible and release pending controls', async () => {
  const { card } = await fixture({ service: async () => { throw new Error('Permission denied'); } });
  query(card, '[data-adjust="target-up"]').click(); await settle(card);
  assert.match(text(card), /Setting failed: Permission denied/);
  assert.equal(query(card, '[data-adjust="target-up"]').disabled, false);
});
test('unacknowledged writes time out without retrying', async () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  const { card, calls } = await fixture();
  query(card, '[data-adjust="target-up"]').click(); await settle(card);
  mock.timers.tick(15001); await settle(card);
  assert.match(text(card), /No confirmation received/);
  assert.equal(calls.length, 1);
});
test('config changes invalidate pending response callbacks', async () => {
  let resolve;
  const { card } = await fixture({ service: () => new Promise(r => { resolve = r; }) });
  query(card, '[data-adjust="target-up"]').click(); await settle(card);
  card.setConfig({ ...mockConfig, title: 'Reconfigured' }); await settle(card);
  resolve(); await settle(card);
  assert.doesNotMatch(text(card), /Request accepted|Sending setting|Setting updated/);
});
test('details are read-only, preserve units and do not invent COP', async () => {
  const { card } = await fixture(); await nav(card, 'details');
  const rows = [...root(card).querySelectorAll('.data-row')];
  assert.equal(rows.find(r => r.textContent.includes('Controller heater permission')).tagName, 'DIV');
  assert.equal(rows.find(r => r.textContent.includes('Operating mode')).tagName, 'DIV');
  assert.match(text(card), /Produced heat and COP are not inferred/);
  assert.match(text(card), /0\.9 kW/);
});
test('sensor history uses native more-info and register rows cannot emit it', async () => {
  const { card } = await fixture(); await nav(card, 'details');
  const events = []; card.addEventListener('hass-more-info', e => events.push(e.detail.entityId));
  const rows = [...root(card).querySelectorAll('.data-row')];
  rows.find(r => r.textContent.includes('Compressor input')).click();
  assert.deepEqual(events, ['sensor.compr_in_power_43141']);
  rows.find(r => r.textContent.includes('Controller heater permission')).click();
  assert.equal(events.length, 1);
});
test('native history loads only on demand and propagates fresh hass', async () => {
  const configs = [];
  window.loadCardHelpers = async () => ({ createCardElement(config) { configs.push(config); return document.createElement('history-test'); } });
  const { card } = await fixture(); assert.equal(configs.length, 0);
  await nav(card, 'history'); await settle(card);
  assert.equal(configs.length, 3);
  assert.ok(configs.every(c => c.type === 'history-graph' && c.hours_to_show === 24));
  assert.ok(configs.flatMap(c => c.entities).every(e => e.entity.startsWith('sensor.')));
  await change(card, { 'sensor.prio_43086': state('OFF') });
  assert.equal(query(card, 'history-test').hass, card.hass);
  await nav(card, 'home'); await nav(card, 'history'); assert.equal(configs.length, 3);
});
test('history loader rejects gracefully and does not retry in a render loop', async () => {
  let attempts = 0;
  window.loadCardHelpers = async () => { attempts++; throw new Error('History not ready'); };
  const { card } = await fixture(); await nav(card, 'history'); await settle(card);
  assert.match(text(card), /History not ready/);
  await change(card, { 'sensor.unrelated': state('on') }); assert.equal(attempts, 1);
});
test('disconnected cards discard pending history creation', async () => {
  let resolve, creations = 0;
  window.loadCardHelpers = () => new Promise(r => { resolve = r; });
  const { card } = await fixture(); await nav(card, 'history'); card.remove();
  resolve({ createCardElement() { creations++; return document.createElement('div'); } }); await settle(card);
  assert.equal(creations, 0);
});
test('visual editor preserves unavailable mappings and emits config changes', async () => {
  const editor = await customElements.get('nibe-dashboard').getConfigElement();
  editor.setConfig({ ...mockConfig, entities: { target: 'input_number.renamed_target' } });
  editor.hass = { states: mockStates() }; document.body.append(editor); await settle(editor);
  const select = query(editor, 'select[aria-label="House comfort target"]');
  assert.equal(select.value, 'input_number.renamed_target');
  let emitted; editor.addEventListener('config-changed', e => { emitted = e.detail.config; });
  select.value = ''; select.dispatchEvent(new Event('change')); await settle(editor);
  assert.equal(emitted.entities.target, null);
  assert.deepEqual(emitted.rooms, mockConfig.rooms);
});
test('unsafe text is rendered as text, not markup', async () => {
  const { card } = await fixture({ config: { title: '<img src=x onerror=alert(1)>' } });
  assert.equal(query(card, 'h1').textContent, '<img src=x onerror=alert(1)>');
  assert.equal(query(card, 'img'), null);
});
test('editor keeps read-only mode and duplicate room selections consistent', async () => {
  const editor = await customElements.get('nibe-dashboard').getConfigElement();
  editor.setConfig({ ...mockConfig, read_only: true }); editor.hass = { states: mockStates() };
  document.body.append(editor); await settle(editor);
  assert.equal(query(editor, 'select[aria-label="Control access"]').value, 'true');
  const room = query(editor, 'select[aria-label="Room 1 thermostat"]');
  assert.equal(room.value, 'climate.living_room');
  room.value = 'climate.bedroom'; room.dispatchEvent(new Event('change')); await settle(editor);
  assert.equal(room.value, 'climate.living_room');
});
