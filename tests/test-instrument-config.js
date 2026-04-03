const { INSTRUMENTS, getInstrument } = require('../instrument-config');

test('has 8 instruments', () => {
  expect(Object.keys(INSTRUMENTS).length).toBe(8);
});

test('tin_whistle has correct note range', () => {
  expect(INSTRUMENTS.tin_whistle.range).toEqual([74, 98]);
  expect(INSTRUMENTS.tin_whistle.step).toBe(2);
});

test('uilleann_pipes has drone notes', () => {
  expect(INSTRUMENTS.uilleann_pipes.drones).toEqual([50, 51]);
});

test('irish_flute has no drones', () => {
  expect(INSTRUMENTS.irish_flute.drones).toEqual([]);
});

test('getInstrument returns instrument by id', () => {
  expect(getInstrument('accordion').label).toBe('Accordion');
});

test('getInstrument throws for unknown id', () => {
  expect(() => getInstrument('banjo')).toThrow('Unknown instrument: banjo');
});

test('highland_bagpipe has drone note 51', () => {
  expect(INSTRUMENTS.highland_bagpipe.drones).toContain(51);
});

test('all instruments have sampleDir', () => {
  for (const inst of Object.values(INSTRUMENTS)) {
    expect(typeof inst.sampleDir).toBe('string');
    expect(inst.sampleDir.length).toBeGreaterThan(0);
  }
});
