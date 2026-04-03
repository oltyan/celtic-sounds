const { findNearestSample, rateForPitch } = require('../note-map');

const samples = [57, 60, 64, 67, 71, 74, 77, 81]; // A3, C4, E4, G4, B4, D5, F5, A5

test('exact sample note returns itself with rate 1.0', () => {
  const result = findNearestSample(60, samples);
  expect(result.sampleNote).toBe(60);
  expect(result.rate).toBeCloseTo(1.0, 5);
});

test('note between samples returns nearest lower sample', () => {
  const result = findNearestSample(62, samples); // D4, nearest is C4 (60)
  expect(result.sampleNote).toBe(60);
});

test('rate for +2 semitones is ~1.1225', () => {
  expect(rateForPitch(2)).toBeCloseTo(Math.pow(2, 2/12), 5);
});

test('rate for -4.5 semitones (drone shift for Highland Bagpipe)', () => {
  // MIDI 57 (A3) shifted to MIDI 51 (Eb3) = -6 semitones
  expect(rateForPitch(-6)).toBeCloseTo(Math.pow(2, -6/12), 5);
});

test('note below all samples returns lowest sample', () => {
  const result = findNearestSample(40, samples);
  expect(result.sampleNote).toBe(57);
});

test('note above all samples returns highest sample', () => {
  const result = findNearestSample(100, samples);
  expect(result.sampleNote).toBe(81);
});
