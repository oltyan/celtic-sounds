const DRONE_NOTES = {
  uilleann_pipes: [50, 51],
  highland_bagpipe: [51],
  smallpipes: [51],
  sackpika: [51],
};

const PARAM_KEYS = ['brightness', 'attack', 'release', 'volume', 'expressionSource'];

function serialize(state) {
  const out = {};

  // Per-instrument params
  for (const [id, params] of Object.entries(state.instruments || {})) {
    for (const key of PARAM_KEYS) {
      if (params[key] !== undefined) out[`${id}_${key}`] = params[key];
    }
  }

  // Drone state
  for (const [id, notes] of Object.entries(state.droneState || {})) {
    for (const [note, active] of Object.entries(notes)) {
      out[`${id}_drone_${note}_active`] = active;
    }
  }

  // Custom instrument
  if (state.custom) {
    if (state.custom.instrumentName !== undefined) out['custom_instrumentName'] = state.custom.instrumentName;
    for (const key of PARAM_KEYS) {
      if (state.custom[key] !== undefined) out[`custom_${key}`] = state.custom[key];
    }
  }

  // Global params
  for (const [key, val] of Object.entries(state.global || {})) {
    out[`global_${key}`] = val;
  }

  return out;
}

function deserialize(json) {
  const state = { instruments: {}, droneState: {}, global: {}, custom: {} };
  const dronePattern = /^([a-z_]+)_drone_(\d+)_active$/;
  const globalPattern = /^global_(.+)$/;
  const customPattern = /^custom_(.+)$/;

  for (const [key, val] of Object.entries(json)) {
    const droneMatch = key.match(dronePattern);
    if (droneMatch) {
      const [, id, note] = droneMatch;
      if (!state.droneState[id]) state.droneState[id] = {};
      state.droneState[id][parseInt(note, 10)] = val;
      continue;
    }

    const globalMatch = key.match(globalPattern);
    if (globalMatch) {
      state.global[globalMatch[1]] = val;
      continue;
    }

    const customMatch = key.match(customPattern);
    if (customMatch) {
      state.custom[customMatch[1]] = val;
      continue;
    }

    // Per-instrument: instrumentId_paramName
    const parts = key.split('_');
    if (parts.length >= 2) {
      const paramName = parts[parts.length - 1];
      const instId = parts.slice(0, -1).join('_');
      if (PARAM_KEYS.includes(paramName)) {
        if (!state.instruments[instId]) state.instruments[instId] = {};
        state.instruments[instId][paramName] = val;
      }
    }
  }

  return state;
}

module.exports = { serialize, deserialize };
