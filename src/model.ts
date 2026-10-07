import type { CardConfig, Entity, Hass, Room } from './types';

export const roles = {
  indoor: ['Indoor temperature', 'sensor', 'sensor.home_temperature_average'],
  outdoor: ['Outdoor temperature', 'sensor', 'sensor.bt1_outdoor_temperature_40004'],
  target: ['House comfort target', 'input_number', 'input_number.indoor_target_temperature'],
  autopilot: ['Autopilot master', 'input_boolean', 'input_boolean.nibe_autopilot_state'],
  heater_cap: ['Heater user cap', 'input_number', 'input_number.nibe_max_add_heat_kw'],
  bias: ['Manual heat trim', 'input_number', 'input_number.nibe_heat_bias'],
  priority: ['Operating priority', 'sensor', 'sensor.prio_43086'],
  alarm: ['Active alarm code', 'sensor', 'sensor.alarm_45001'],
  mode: ['Operating mode', 'select', 'select.operational_mode_47137'],
  hot_water: ['DHW charging (BT6)', 'sensor', 'sensor.bt6_hw_load_40014'],
  tank_top: ['DHW tank top (BT7)', 'sensor', 'sensor.bt7_hw_top_40013'],
  periodic_enabled: ['Periodic boost enabled', 'switch', 'switch.periodic_hw_47050'],
  periodic_interval: ['Periodic interval', 'number', 'number.periodic_hw_interval_47051'],
  periodic_stop: ['Periodic stop setting', 'number', 'number.stop_temperature_periodic_hw_47046'],
  circuit_power: ['Whole heat-pump circuit input', 'sensor', 'sensor.nibe_circuit_input_power_kw'],
  compressor_power: ['Compressor input', 'sensor', 'sensor.compr_in_power_43141'],
  heater_power: ['Electric heater input', 'sensor', 'sensor.int_el_add_power_43084'],
  heater_permission: ['Controller heater permission', 'number', 'number.max_int_add_power_47212'],
  allowance: ['Electrical allowance', 'sensor', 'sensor.nibe_electrical_allowance_kw'],
  mains_fresh: ['Mains readings fresh', 'binary_sensor', 'binary_sensor.nibe_mains_fresh'],
  frequency: ['Compressor actual', 'sensor', 'sensor.compressor_frequency_actual_43136'],
  frequency_limit: ['Controller frequency cap', 'number', 'number.max_comp_freq_47104'],
  supply: ['Supply (BT2)', 'sensor', 'sensor.bt2_supply_temp_s1_40008'],
  return: ['Return (BT3)', 'sensor', 'sensor.eb100_ep14_bt3_return_temp_40012'],
  supply_target: ['Calculated supply', 'sensor', 'sensor.calc_supply_s1_43009'],
  supply_ceiling: ['Supply target ceiling', 'number', 'number.max_supply_system_1_47019'],
  offset: ['Heating curve offset', 'number', 'number.heat_offset_s1_47011'],
  degree_minutes: ['Degree minutes', 'number', 'number.degree_minutes_16_bit_43005'],
  brine_in: ['Brine in (BT10)', 'sensor', 'sensor.eb100_ep14_bt10_brine_in_temp_40015'],
  brine_out: ['Brine out (BT11)', 'sensor', 'sensor.eb100_ep14_bt11_brine_out_temp_40016'],
  hot_gas: ['Hot gas (BT14)', 'sensor', 'sensor.eb100_ep14_bt14_hot_gas_temp_40018'],
  condenser: ['Condenser out (BT12)', 'sensor', 'sensor.eb100_ep14_bt12_condensor_out_40017'],
  pump_speed: ['Heating pump (GP1)', 'sensor', 'sensor.supply_pump_speed_ep14_43437'],
  brine_speed: ['Brine pump (GP2)', 'sensor', 'sensor.ep14_gp2_brine_pump_status_ep14_43439'],
  ready_zones: ['Delayed zone requests', 'sensor', 'sensor.nibe_ready_zone_count'],
  warm_guard: ['Warm-room guard', 'input_boolean', 'input_boolean.nibe_warm_room_guard'],
  global_hold: ['Global fault hold until', 'input_datetime', 'input_datetime.nibe_overheat_until'],
  condenser_hold: ['Condenser space-heat hold until', 'input_datetime', 'input_datetime.nibe_condenser_hold_until'],
} as const;
export type Role = keyof typeof roles;
export type ControlRole = 'target' | 'heater_cap' | 'bias' | 'autopilot';
export const controlRoles = new Set<Role>(['target', 'heater_cap', 'bias', 'autopilot']);
export const nativeControls = { target: 'comfort_target', heater_cap: 'heater_cap', bias: 'heat_bias', autopilot: 'enabled' } as const;
const managedRoles = new Set<Role>([...controlRoles, 'indoor', 'circuit_power', 'allowance', 'ready_zones', 'warm_guard', 'mains_fresh', 'global_hold', 'condenser_hold']);
const entityPattern = /^[a-z_]+\.[a-z0-9_]+$/;

export function roleDomains(role: Role, native = false): string[] {
  if (!native) return [roles[role][1]];
  if (role === 'autopilot') return ['switch'];
  if (controlRoles.has(role)) return ['number'];
  if (role === 'warm_guard') return ['binary_sensor'];
  if (role === 'global_hold' || role === 'condenser_hold') return ['sensor'];
  return [roles[role][1]];
}

export function validateConfig(config: CardConfig): CardConfig {
  if (!config || config.type !== 'custom:nibe-dashboard') throw new Error('Use type: custom:nibe-dashboard');
  if (config.controller_entity !== undefined && (typeof config.controller_entity !== 'string' || !/^sensor\.[a-z0-9_]+$/.test(config.controller_entity))) throw new Error('controller_entity must be the NIBE Autopilot status sensor');
  for (const key of ['title', 'subtitle'] as const) {
    if (config[key] !== undefined && typeof config[key] !== 'string') throw new Error(`${key} must be text`);
  }
  if (config.read_only !== undefined && typeof config.read_only !== 'boolean') throw new Error('read_only must be true or false');
  if (config.entities !== undefined && (!config.entities || Array.isArray(config.entities) || typeof config.entities !== 'object')) throw new Error('entities must be a mapping');
  for (const [key, id] of Object.entries(config.entities ?? {})) {
    if (!(key in roles)) throw new Error(`Unknown entity role: ${key}`);
    if (id === null) continue;
    const domains = roleDomains(key as Role, !!config.controller_entity);
    if (typeof id !== 'string' || !entityPattern.test(id) || !domains.some(domain => id.startsWith(`${domain}.`))) throw new Error(`${key} must be a ${domains.join('/')} entity or null`);
  }
  if (config.rooms !== undefined && !Array.isArray(config.rooms)) throw new Error('rooms must be a list');
  for (const room of config.rooms ?? []) {
    if (!room || typeof room.entity !== 'string' || !/^climate\.[a-z0-9_]+$/.test(room.entity)) throw new Error('Each room needs a climate entity');
    if (room.name !== undefined && typeof room.name !== 'string') throw new Error('Room name must be text');
  }
  if (new Set((config.rooms ?? []).map(r => r.entity)).size !== (config.rooms ?? []).length) throw new Error('Room entities must be unique');
  if (config.watch_automations !== undefined && (!Array.isArray(config.watch_automations) || config.watch_automations.some(id => typeof id !== 'string' || !/^automation\.[a-z0-9_]+$/.test(id)))) throw new Error('watch_automations must contain automation entities');
  if (config.history_hours !== undefined && (!Number.isInteger(config.history_hours) || config.history_hours < 1 || config.history_hours > 168)) throw new Error('history_hours must be an integer from 1 to 168');
  return { ...config, entities: { ...config.entities }, rooms: config.rooms?.map(r => ({ ...r })), watch_automations: [...(config.watch_automations ?? [])] };
}
export function controller(config: CardConfig, hass?: Hass): Entity | undefined {
  const entity = config.controller_entity ? hass?.states[config.controller_entity] : undefined;
  return available(entity) && entity.attributes.nibe_autopilot === true ? entity : undefined;
}
export function entityId(config: CardConfig, role: Role, hass?: Hass): string | undefined {
  const explicit = config.entities?.[role];
  if (explicit !== undefined) return explicit ?? undefined;
  if (config.controller_entity) {
    const bindings = controller(config, hass)?.attributes.dashboard_entities as Record<string, unknown> | undefined;
    const id = bindings?.[role];
    if (typeof id === 'string' && entityPattern.test(id) && roleDomains(role, true).some(d => id.startsWith(`${d}.`))) return id;
    if (managedRoles.has(role)) return undefined;
  }
  return roles[role][2];
}
export function controlDomain(config: CardConfig, role: ControlRole, hass?: Hass): string | undefined {
  const id = entityId(config, role, hass);
  if (!id) return undefined;
  if (!config.controller_entity) return id.startsWith(`${roles[role][1]}.`) ? roles[role][1] : undefined;
  const c = controller(config, hass);
  const bindings = c?.attributes.dashboard_entities as Record<string, unknown> | undefined;
  const e = hass?.states[id];
  if (bindings?.[role] !== id || e?.attributes.nibe_autopilot_control !== nativeControls[role]) return undefined;
  return id.split('.')[0];
}
export function configuredRooms(config: CardConfig, hass?: Hass): Room[] {
  if (config.rooms !== undefined) return config.rooms;
  const ids = controller(config, hass)?.attributes.room_entities;
  return Array.isArray(ids) ? [...new Set(ids.filter(id => typeof id === 'string' && /^climate\.[a-z0-9_]+$/.test(id)))].map(entity => ({ entity })) : [];
}
export function available(entity?: Entity): entity is Entity {
  return !!entity && !['unknown', 'unavailable', ''].includes(entity.state.toLowerCase());
}
export function numeric(value: unknown): number | undefined {
  if ((typeof value !== 'string' && typeof value !== 'number') || (typeof value === 'string' && !value.trim())) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}
export function connected(hass?: Hass): boolean {
  return !!hass && hass.connected !== false && hass.connection?.connected !== false;
}
export function priority(entity?: Entity): { label: string; icon: string; tone: string } {
  const value = available(entity) ? entity.state.trim().toUpperCase() : '';
  if (value === 'HEAT' || value === 'HEATING') return { label: 'Heating your home', icon: 'mdi:radiator', tone: 'heat' };
  if (value.includes('HOT WATER')) return { label: 'Heating hot water', icon: 'mdi:water-thermometer', tone: 'water' };
  if (value === 'OFF' || value === 'STANDBY') return { label: 'On standby', icon: 'mdi:heat-pump-outline', tone: 'idle' };
  if (value === 'COOL' || value === 'COOLING') return { label: 'Cooling your home', icon: 'mdi:snowflake', tone: 'water' };
  return { label: value ? `Priority: ${entity!.state}` : 'Priority unavailable', icon: 'mdi:heat-pump-outline', tone: 'idle' };
}
export function numberBounds(entity?: Entity, climate = false) {
  if (!available(entity)) return undefined;
  const current = numeric(climate ? entity.attributes.temperature : entity.state);
  const min = numeric(entity.attributes[climate ? 'min_temp' : 'min']);
  const max = numeric(entity.attributes[climate ? 'max_temp' : 'max']);
  const step = numeric(entity.attributes[climate ? 'target_temp_step' : 'step']);
  // Climate defaults vary across integrations. Without explicit limits, do not guess.
  if (current === undefined || min === undefined || max === undefined || step === undefined || min >= max || step <= 0 || step > max - min || current < min || current > max) return undefined;
  if (climate && !(Number(entity.attributes.supported_features) & 1)) return undefined;
  return { current, min, max, step };
}
export function nextNumber(entity: Entity | undefined, direction: number, climate = false): number | undefined {
  const b = numberBounds(entity, climate);
  if (!b || (direction !== 1 && direction !== -1)) return undefined;
  const next = Math.round(Math.min(b.max, Math.max(b.min, b.current + direction * b.step)) * 1e6) / 1e6;
  return next === b.current ? undefined : next;
}
export function formatEntity(entity: Entity | undefined, digits = 1): string {
  if (!available(entity)) return 'Unavailable';
  const number = numeric(entity.state);
  const value = number === undefined ? entity.state : number.toFixed(digits).replace(/\.0$/, '');
  return `${value}${entity.attributes.unit_of_measurement ? ` ${entity.attributes.unit_of_measurement}` : ''}`;
}
