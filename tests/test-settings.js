const { serialize, deserialize } = require('../js/settings');

const INSTRUMENT_IDS = [
  'tin_whistle', 'irish_flute', 'uilleann_pipes', 'anglo_concertina',
  'accordion', 'highland_bagpipe', 'smallpipes', 'sackpipa', 'custom'
];

const DRONE_NOTES = {
  uilleann_pipes: [50, 51],
  highland_bagpipe: [51],
  smallpipes: [51],
  sackpika: [51],
};

test('serializes instrument params with correct key pattern', () => {
  const state = {
    instruments: { tin_whistle: { brightness: 0.2, attack: 10, release: 120, volume: 80, expressionSource: 'cc11' } },
    droneState: {},
    global: { reverbStyle: 'hall1', reverbPreDelay: 10, reverbWet: 30, masterVolume: 80, transpose: 0, masterTune: 0 },
    custom: { instrumentName: null }
  };
  const json = serialize(state);
  expect(json.tin_whistle_brightness).toBe(0.2);
  expect(json.tin_whistle_expressionSource).toBe('cc11');
  expect(json.global_reverbStyle).toBe('hall1');
});

test('serializes drone state per note', () => {
  const state = {
    instruments: {},
    droneState: { highland_bagpipe: { 51: true } },
    global: {},
    custom: {}
  };
  const json = serialize(state);
  expect(json.highland_bagpipe_drone_51_active).toBe(true);
});

test('deserializes back to state object', () => {
  const json = {
    tin_whistle_brightness: 0.3,
    tin_whistle_attack: 15,
    global_reverbStyle: 'room2',
    highland_bagpipe_drone_51_active: false
  };
  const state = deserialize(json);
  expect(state.instruments.tin_whistle.brightness).toBe(0.3);
  expect(state.global.reverbStyle).toBe('room2');
  expect(state.droneState.highland_bagpipe[51]).toBe(false);
});
