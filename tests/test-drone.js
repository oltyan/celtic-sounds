const { DroneController } = require('../drone');

test('drone starts off', () => {
  const d = new DroneController([51]);
  expect(d.isActive(51)).toBe(false);
});

test('note-on activates drone', () => {
  const d = new DroneController([51]);
  d.noteOn(51);
  expect(d.isActive(51)).toBe(true);
});

test('note-off is ignored (drone stays on)', () => {
  const d = new DroneController([51]);
  d.noteOn(51);
  d.noteOff(51);
  expect(d.isActive(51)).toBe(true);
});

test('second note-on toggles drone off', () => {
  const d = new DroneController([51]);
  d.noteOn(51);
  d.noteOn(51);
  expect(d.isActive(51)).toBe(false);
});

test('third note-on toggles back on', () => {
  const d = new DroneController([51]);
  d.noteOn(51); // on
  d.noteOn(51); // off
  d.noteOn(51); // on
  expect(d.isActive(51)).toBe(true);
});

test('non-drone note does not affect drone state', () => {
  const d = new DroneController([51]);
  d.noteOn(51);
  d.noteOn(60); // not a drone note
  expect(d.isActive(51)).toBe(true);
});

test('uilleann pipes: two independent drones', () => {
  const d = new DroneController([50, 51]);
  d.noteOn(50);
  expect(d.isActive(50)).toBe(true);
  expect(d.isActive(51)).toBe(false);
  d.noteOn(51);
  expect(d.isActive(51)).toBe(true);
  d.noteOn(50); // toggle off
  expect(d.isActive(50)).toBe(false);
  expect(d.isActive(51)).toBe(true); // unaffected
});

test('getState returns all drone states', () => {
  const d = new DroneController([50, 51]);
  d.noteOn(51);
  const state = d.getState();
  expect(state).toEqual({ 50: false, 51: true });
});

test('setState restores exported state', () => {
  const d = new DroneController([50, 51]);
  d.setState({ 50: true, 51: false });
  expect(d.isActive(50)).toBe(true);
  expect(d.isActive(51)).toBe(false);
});
