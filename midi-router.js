var INSTRUMENT_NOTE_MAPS = {
  uilleann_pipes: { drones: [50, 51], regulators: [52, 61], chanterMin: 62 },
  highland_bagpipe: { drones: [51] },
  smallpipes: { drones: [51] },
  sackpipa: { drones: [51] },
};

function routeNote(note, velocity, instrumentId) {
  var map = INSTRUMENT_NOTE_MAPS[instrumentId];
  if (!map) return { destination: 'melody', note: note, velocity: velocity };

  if (map.drones && map.drones.indexOf(note) >= 0) {
    return { destination: 'drone', note: note, velocity: velocity };
  }
  if (map.regulators && note >= map.regulators[0] && note <= map.regulators[1]) {
    return { destination: 'regulator', note: note, velocity: velocity };
  }
  return { destination: 'melody', note: note, velocity: velocity };
}

exports.routeNote = routeNote;
