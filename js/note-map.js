function rateForPitch(semitones) {
  return Math.pow(2, semitones / 12);
}

function findNearestSample(targetNote, availableSamples) {
  if (!availableSamples || availableSamples.length === 0) {
    throw new Error('No samples available');
  }
  const sorted = [...availableSamples].sort((a, b) => a - b);
  let nearest = sorted[0];
  let minDist = Math.abs(targetNote - sorted[0]);
  for (const s of sorted) {
    const dist = Math.abs(targetNote - s);
    if (dist < minDist) {
      minDist = dist;
      nearest = s;
    }
  }
  const semitones = targetNote - nearest;
  return { sampleNote: nearest, semitones, rate: rateForPitch(semitones) };
}

module.exports = { findNearestSample, rateForPitch };
