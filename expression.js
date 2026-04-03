var CC_THRESHOLD = 4;

function ccToGain(value) {
  if (value < CC_THRESHOLD) return 0;
  var normalized = value / 127;
  return normalized * normalized;
}

function velocityToGain(value) {
  if (value <= 0) return 0;
  var normalized = value / 127;
  return normalized * normalized;
}

exports.ccToGain = ccToGain;
exports.velocityToGain = velocityToGain;
exports.CC_THRESHOLD = CC_THRESHOLD;
