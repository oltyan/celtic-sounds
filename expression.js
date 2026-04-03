const CC_THRESHOLD = 4;

function ccToGain(value) {
  if (value < CC_THRESHOLD) return 0;
  const normalized = value / 127;
  return normalized * normalized; // x^2 exponential curve
}

function velocityToGain(value) {
  if (value <= 0) return 0;
  const normalized = value / 127;
  return normalized * normalized;
}

module.exports = { ccToGain, velocityToGain, CC_THRESHOLD };
