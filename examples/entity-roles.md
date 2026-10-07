# Entity roles

These are conventional F-series/NibeGW and companion-helper IDs, not auto-discovery. Override in the editor or `entities` mapping; `null` disables a role. Mapping alone does not enable or create an entity. Only `target`, `heater_cap`, `bias` and `autopilot` are writable roles. Rooms are configured separately.

| Role | Label | Domain | Default |
| --- | --- | --- | --- |
| `indoor` | Indoor temperature | `sensor` | `sensor.home_temperature_average` |
| `outdoor` | Outdoor temperature | `sensor` | `sensor.bt1_outdoor_temperature_40004` |
| `target` | House comfort target | `input_number` | `input_number.indoor_target_temperature` |
| `autopilot` | Autopilot master | `input_boolean` | `input_boolean.nibe_autopilot_state` |
| `heater_cap` | Heater user cap | `input_number` | `input_number.nibe_max_add_heat_kw` |
| `bias` | Manual heat trim | `input_number` | `input_number.nibe_heat_bias` |
| `priority` | Operating priority | `sensor` | `sensor.prio_43086` |
| `alarm` | Active alarm code | `sensor` | `sensor.alarm_45001` |
| `mode` | Operating mode | `select` | `select.operational_mode_47137` |
| `hot_water` | DHW charging (BT6) | `sensor` | `sensor.bt6_hw_load_40014` |
| `tank_top` | DHW tank top (BT7) | `sensor` | `sensor.bt7_hw_top_40013` |
| `periodic_enabled` | Periodic boost enabled | `switch` | `switch.periodic_hw_47050` |
| `periodic_interval` | Periodic interval | `number` | `number.periodic_hw_interval_47051` |
| `periodic_stop` | Periodic stop setting | `number` | `number.stop_temperature_periodic_hw_47046` |
| `circuit_power` | Whole heat-pump circuit input | `sensor` | `sensor.nibe_circuit_input_power_kw` |
| `compressor_power` | Compressor input | `sensor` | `sensor.compr_in_power_43141` |
| `heater_power` | Electric heater input | `sensor` | `sensor.int_el_add_power_43084` |
| `heater_permission` | Controller heater permission | `number` | `number.max_int_add_power_47212` |
| `allowance` | Electrical allowance | `sensor` | `sensor.nibe_electrical_allowance_kw` |
| `mains_fresh` | Mains readings fresh | `binary_sensor` | `binary_sensor.nibe_mains_fresh` |
| `frequency` | Compressor actual | `sensor` | `sensor.compressor_frequency_actual_43136` |
| `frequency_limit` | Controller frequency cap | `number` | `number.max_comp_freq_47104` |
| `supply` | Supply (BT2) | `sensor` | `sensor.bt2_supply_temp_s1_40008` |
| `return` | Return (BT3) | `sensor` | `sensor.eb100_ep14_bt3_return_temp_40012` |
| `supply_target` | Calculated supply | `sensor` | `sensor.calc_supply_s1_43009` |
| `supply_ceiling` | Supply target ceiling | `number` | `number.max_supply_system_1_47019` |
| `offset` | Heating curve offset | `number` | `number.heat_offset_s1_47011` |
| `degree_minutes` | Degree minutes | `number` | `number.degree_minutes_16_bit_43005` |
| `brine_in` | Brine in (BT10) | `sensor` | `sensor.eb100_ep14_bt10_brine_in_temp_40015` |
| `brine_out` | Brine out (BT11) | `sensor` | `sensor.eb100_ep14_bt11_brine_out_temp_40016` |
| `hot_gas` | Hot gas (BT14) | `sensor` | `sensor.eb100_ep14_bt14_hot_gas_temp_40018` |
| `condenser` | Condenser out (BT12) | `sensor` | `sensor.eb100_ep14_bt12_condensor_out_40017` |
| `pump_speed` | Heating pump (GP1) | `sensor` | `sensor.supply_pump_speed_ep14_43437` |
| `brine_speed` | Brine pump (GP2) | `sensor` | `sensor.ep14_gp2_brine_pump_status_ep14_43439` |
| `ready_zones` | Delayed zone requests | `sensor` | `sensor.nibe_ready_zone_count` |
| `warm_guard` | Warm-room guard | `input_boolean` | `input_boolean.nibe_warm_room_guard` |
| `global_hold` | Global fault hold until | `input_datetime` | `input_datetime.nibe_overheat_until` |
| `condenser_hold` | Condenser space-heat hold until | `input_datetime` | `input_datetime.nibe_condenser_hold_until` |
