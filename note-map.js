function rateForPitch(semitones) {
  return Math.pow(2, semitones / 12);
}

function findNearestSample(targetNote, availableSamples) {
  if (!availableSamples || availableSamples.length === 0) {
    throw new Error('No samples available');
  }
  var sorted = availableSamples.slice().sort(function(a, b) { return a - b; });
  var nearest = sorted[0];
  var minDist = Math.abs(targetNote - sorted[0]);
  var i, dist;
  for (i = 0; i < sorted.length; i++) {
    dist = Math.abs(targetNote - sorted[i]);
    if (dist < minDist) {
      minDist = dist;
      nearest = sorted[i];
    }
  }
  var semitones = targetNote - nearest;
  return { sampleNote: nearest, semitones: semitones, rate: rateForPitch(semitones) };
}

module.exports = { findNearestSample: findNearestSample, rateForPitch: rateForPitch };
