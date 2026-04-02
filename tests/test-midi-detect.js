const { detectMode } = require('../js/midi-detect');

test('WARBL found by default substring', () => {
  const result = detectMode(['WARBL v3', 'Launchkey 49'], 'WARBL');
  expect(result.mode).toBe('warbl');
  expect(result.deviceName).toBe('WARBL v3');
});

test('WARBL match is case-insensitive', () => {
  const result = detectMode(['warbl USB'], 'WARBL');
  expect(result.mode).toBe('warbl');
});

test('custom override string matches renamed WARBL', () => {
  const result = detectMode(['My Wind Controller', 'Launchkey'], 'Wind Controller');
  expect(result.mode).toBe('warbl');
  expect(result.deviceName).toBe('My Wind Controller');
});

test('no WARBL, keyboard found returns limited mode', () => {
  const result = detectMode(['Launchkey 49 MK3'], 'WARBL');
  expect(result.mode).toBe('keyboard');
  expect(result.deviceName).toBe('Launchkey 49 MK3');
});

test('no devices returns inactive mode', () => {
  const result = detectMode([], 'WARBL');
  expect(result.mode).toBe('inactive');
  expect(result.deviceName).toBeNull();
});

test('empty string override falls back to first device as keyboard', () => {
  const result = detectMode(['Launchkey'], '');
  expect(result.mode).toBe('keyboard');
});
