function validateInstrumentManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== 'object') {
    return { errors: ['instrument.json is not a valid JSON object'] };
  }
  if (!manifest.name) errors.push('Missing required field: name');
  if (!manifest.noteRange) {
    errors.push('Missing required field: noteRange');
  } else if (
    !Array.isArray(manifest.noteRange) ||
    manifest.noteRange.length !== 2 ||
    !Number.isInteger(manifest.noteRange[0]) ||
    !Number.isInteger(manifest.noteRange[1])
  ) {
    errors.push('noteRange must be an array of two integers [min, max]');
  } else if (
    manifest.noteRange[0] < 0 || manifest.noteRange[1] > 127 ||
    manifest.noteRange[0] >= manifest.noteRange[1]
  ) {
    errors.push('noteRange values must be valid MIDI note numbers (0–127) with min < max');
  }
  if (manifest.drones === undefined) {
    errors.push('Missing required field: drones');
  } else if (!Array.isArray(manifest.drones)) {
    errors.push('drones must be an array of MIDI note numbers');
  }
  return { errors };
}

function validateSampleFilenames(filenames, noteRange) {
  const [min, max] = noteRange;
  const presentNotes = new Set();
  const audioExts = new Set(['.mp3', '.wav', '.ogg']);

  for (const f of filenames) {
    const match = f.match(/^(\d+)\.(mp3|wav|ogg)$/i);
    if (match) {
      const note = parseInt(match[1], 10);
      if (note >= min && note <= max) presentNotes.add(note);
    }
  }

  const coverage = {};
  const warnings = [];

  // Check for missing samples and determine coverage
  let gapStart = null;
  for (let note = min; note <= max; note++) {
    if (presentNotes.has(note)) {
      coverage[note] = 'present';
      if (gapStart !== null) {
        warnings.push(`Gap from note ${gapStart} to ${note - 1}`);
        gapStart = null;
      }
    } else {
      if (gapStart === null) gapStart = note;
      // Check if within 6 semitones of a present note
      let nearbyExists = false;
      for (let offset = 1; offset <= 6; offset++) {
        if (presentNotes.has(note - offset) || presentNotes.has(note + offset)) {
          nearbyExists = true;
          break;
        }
      }
      coverage[note] = nearbyExists ? 'shifted' : 'gap';
    }
  }
  if (gapStart !== null) {
    warnings.push(`Gap from note ${gapStart} to ${max}`);
  }

  if (presentNotes.size === 0) {
    warnings.push('No audio samples found in the declared note range');
  }

  return { coverage, warnings };
}

module.exports = { validateInstrumentManifest, validateSampleFilenames };
