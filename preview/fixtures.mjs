// Entirely synthetic fixtures. No production registry or household data.
const entity = (state, attributes = {}) => ({ state: String(state), attributes, last_updated: new Date().toISOString() });
const sensor = (value, unit) => entity(value, { unit_of_measurement: unit });
export function mockStates() {
  const states = {
    'sensor.home_temperature_average': sensor(22.3, '\u00b0C'),
    'sensor.bt1_outdoor_temperature_40004': sensor(8.7, '\u00b0C'),
    'sensor.prio_43086': entity('HEAT'),
    'sensor.alarm_45001': entity(0),
    'select.operational_mode_47137': entity('AUTO'),
    'input_boolean.nibe_autopilot_state': entity('on'),
    'input_boolean.nibe_warm_room_guard': entity('off'),
    'input_number.indoor_target_temperature': entity(22.5, { min: 18, max: 30, step: 0.5, unit_of_measurement: '\u00b0C' }),
    'input_number.nibe_max_add_heat_kw': entity(3, { min: 0, max: 6, step: 0.5, unit_of_measurement: 'kW' }),
    'input_number.nibe_heat_bias': entity(0, { min: -3, max: 3, step: 0.5 }),
    'sensor.bt6_hw_load_40014': sensor(48.6, '\u00b0C'),
    'sensor.bt7_hw_top_40013': sensor(51.2, '\u00b0C'),
    'switch.periodic_hw_47050': entity('on'),
    'number.periodic_hw_interval_47051': sensor(7, 'days'),
    'number.stop_temperature_periodic_hw_47046': sensor(55, '\u00b0C'),
    'sensor.nibe_circuit_input_power_kw': sensor(0.86, 'kW'),
    'sensor.compr_in_power_43141': sensor(0.72, 'kW'),
    'sensor.int_el_add_power_43084': sensor(0, 'kW'),
    'number.max_int_add_power_47212': sensor(0, 'kW'),
    'sensor.nibe_electrical_allowance_kw': sensor(2, 'kW'),
    'binary_sensor.nibe_mains_fresh': entity('on'),
    'sensor.compressor_frequency_actual_43136': sensor(36, 'Hz'),
    'number.max_comp_freq_47104': sensor(85, 'Hz'),
    'sensor.bt2_supply_temp_s1_40008': sensor(28.1, '\u00b0C'),
    'sensor.eb100_ep14_bt3_return_temp_40012': sensor(25.4, '\u00b0C'),
    'sensor.calc_supply_s1_43009': sensor(27, '\u00b0C'),
    'number.max_supply_system_1_47019': sensor(42, '\u00b0C'),
    'number.heat_offset_s1_47011': entity(-1),
    'number.degree_minutes_16_bit_43005': entity(-78),
    'sensor.eb100_ep14_bt10_brine_in_temp_40015': sensor(7.2, '\u00b0C'),
    'sensor.eb100_ep14_bt11_brine_out_temp_40016': sensor(4.5, '\u00b0C'),
    'sensor.eb100_ep14_bt14_hot_gas_temp_40018': sensor(61.8, '\u00b0C'),
    'sensor.eb100_ep14_bt12_condensor_out_40017': sensor(29, '\u00b0C'),
    'sensor.supply_pump_speed_ep14_43437': sensor(70, '%'),
    'sensor.ep14_gp2_brine_pump_status_ep14_43439': sensor(38, '%'),
    'sensor.nibe_ready_zone_count': entity(3),
    'input_datetime.nibe_overheat_until': entity('2000-01-01 00:00:00'),
    'input_datetime.nibe_condenser_hold_until': entity('2000-01-01 00:00:00'),
    'automation.heat_controller': entity('on', { friendly_name: 'Heat controller' }),
    'automation.compressor_governor': entity('on', { friendly_name: 'Compressor governor' }),
  };
  [['living_room', 'Living room', 22.1, 22.5, 'heating'], ['bedroom', 'Bedroom', 21.3, 21, 'idle'], ['study', 'Study', 21.7, 22, 'heating'], ['bathroom', 'Bathroom', 23.1, 23.5, 'heating']].forEach(([id, name, current, target, action]) => {
    states[`climate.${id}`] = entity('heat', { friendly_name: name, current_temperature: current, temperature: target, hvac_action: action, min_temp: 10, max_temp: 30, target_temp_step: 0.5, supported_features: 1 });
  });
  return states;
}
export const mockConfig = {
  type: 'custom:nibe-dashboard',
  title: 'Heat pump',
  subtitle: 'NIBE F1255 / ground source',
  rooms: ['living_room', 'bedroom', 'study', 'bathroom'].map(id => ({ entity: `climate.${id}` })),
  watch_automations: ['automation.heat_controller', 'automation.compressor_governor'],
};
