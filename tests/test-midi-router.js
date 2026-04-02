const { routeNote } = require('../js/midi-router');

test('uilleann_pipes MIDI 50 → drone', () => {
  expect(routeNote(50, 100, 'uilleann_pipes').destination).toBe('drone');
});
test('uilleann_pipes MIDI 51 → drone', () => {
  expect(routeNote(51, 100, 'uilleann_pipes').destination).toBe('drone');
});
test('uilleann_pipes MIDI 52 → regulator (lower boundary)', () => {
  expect(routeNote(52, 100, 'uilleann_pipes').destination).toBe('regulator');
});
test('uilleann_pipes MIDI 61 → regulator (upper boundary)', () => {
  expect(routeNote(61, 100, 'uilleann_pipes').destination).toBe('regulator');
});
test('uilleann_pipes MIDI 62 → melody (chanter lower boundary)', () => {
  expect(routeNote(62, 100, 'uilleann_pipes').destination).toBe('melody');
});
test('uilleann_pipes MIDI 80 → melody', () => {
  expect(routeNote(80, 100, 'uilleann_pipes').destination).toBe('melody');
});
test('highland_bagpipe MIDI 51 → drone', () => {
  expect(routeNote(51, 100, 'highland_bagpipe').destination).toBe('drone');
});
test('highland_bagpipe MIDI 60 → melody', () => {
  expect(routeNote(60, 100, 'highland_bagpipe').destination).toBe('melody');
});
test('tin_whistle has no drones — all notes → melody', () => {
  expect(routeNote(74, 100, 'tin_whistle').destination).toBe('melody');
});
