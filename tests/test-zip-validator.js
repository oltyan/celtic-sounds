const { validateInstrumentManifest, validateSampleFilenames } = require('../js/zip-validator');

// validateInstrumentManifest tests
test('valid manifest passes', () => {
  const r = validateInstrumentManifest({ name: 'Test', noteRange: [60, 80], drones: [] });
  expect(r.errors).toHaveLength(0);
});

test('missing name fails', () => {
  const r = validateInstrumentManifest({ noteRange: [60, 80], drones: [] });
  expect(r.errors).toContain('Missing required field: name');
});

test('missing noteRange fails', () => {
  const r = validateInstrumentManifest({ name: 'Test', drones: [] });
  expect(r.errors).toContain('Missing required field: noteRange');
});

test('noteRange not array of 2 ints fails', () => {
  const r = validateInstrumentManifest({ name: 'Test', noteRange: [60], drones: [] });
  expect(r.errors.length).toBeGreaterThan(0);
});

test('noteRange values out of MIDI range fails', () => {
  const r = validateInstrumentManifest({ name: 'Test', noteRange: [-1, 128], drones: [] });
  expect(r.errors.length).toBeGreaterThan(0);
});

test('missing drones field fails', () => {
  const r = validateInstrumentManifest({ name: 'Test', noteRange: [60, 80] });
  expect(r.errors).toContain('Missing required field: drones');
});

// validateSampleFilenames tests
test('all notes covered returns no warnings', () => {
  const range = [60, 62];
  const files = ['60.mp3', '61.mp3', '62.mp3'];
  const r = validateSampleFilenames(files, range);
  expect(r.warnings).toHaveLength(0);
  expect(r.coverage[60]).toBe('present');
});

test('gap returns warning', () => {
  const range = [60, 65];
  const files = ['60.mp3', '65.mp3'];
  const r = validateSampleFilenames(files, range);
  expect(r.warnings.length).toBeGreaterThan(0);
});

test('no samples at all returns warning', () => {
  const r = validateSampleFilenames([], [60, 70]);
  expect(r.warnings.length).toBeGreaterThan(0);
});
