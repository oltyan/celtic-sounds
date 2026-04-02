const { ccToGain, velocityToGain } = require('../js/expression');

test('CC value 0 returns 0', () => {
  expect(ccToGain(0)).toBe(0);
});

test('CC value 3 returns 0 (below threshold)', () => {
  expect(ccToGain(3)).toBe(0);
});

test('CC value 4 returns non-zero (at threshold)', () => {
  expect(ccToGain(4)).toBeGreaterThan(0);
});

test('CC value 127 returns 1.0', () => {
  expect(ccToGain(127)).toBeCloseTo(1.0, 5);
});

test('CC midpoint 64 returns approximately 0.253', () => {
  expect(ccToGain(64)).toBeCloseTo((64/127) ** 2, 5);
});

test('velocity 1 returns non-zero (no threshold for velocity)', () => {
  expect(velocityToGain(1)).toBeGreaterThan(0);
});

test('velocity 0 returns 0', () => {
  expect(velocityToGain(0)).toBe(0);
});

test('velocity 127 returns 1.0', () => {
  expect(velocityToGain(127)).toBeCloseTo(1.0, 5);
});
