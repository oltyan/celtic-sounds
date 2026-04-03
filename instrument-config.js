var INSTRUMENTS = {
  tin_whistle: {
    label: 'Tin Whistle',
    sampleDir: 'tin_whistle',
    range: [74, 98],
    step: 2,
    drones: [],
  },
  irish_flute: {
    label: 'Irish Flute',
    sampleDir: 'irish_flute',
    range: [62, 86],
    step: 2,
    drones: [],
  },
  uilleann_pipes: {
    label: 'Uilleann Pipes',
    sampleDir: 'uilleann_pipes',
    range: [62, 86],
    step: 2,
    drones: [50, 51],
    regulators: [52, 61],
    chanterMin: 62,
  },
  anglo_concertina: {
    label: 'Anglo Concertina',
    sampleDir: 'anglo_concertina',
    range: [48, 84],
    step: 2,
    drones: [],
  },
  accordion: {
    label: 'Accordion',
    sampleDir: 'accordion',
    range: [36, 84],
    step: 2,
    drones: [],
  },
  highland_bagpipe: {
    label: 'Highland Bagpipe',
    sampleDir: 'highland_bagpipe',
    range: [57, 81],
    step: 2,
    drones: [51],
  },
  smallpipes: {
    label: 'Smallpipes',
    sampleDir: 'smallpipes',
    range: [57, 81],
    step: 2,
    drones: [51],
  },
  sackpipa: {
    label: 'S\u00e4ckpipa',
    sampleDir: 'sackpipa',
    range: [62, 86],
    step: 2,
    drones: [51],
  },
};

function getInstrument(id) {
  if (!INSTRUMENTS[id]) throw new Error('Unknown instrument: ' + id);
  return INSTRUMENTS[id];
}

exports.INSTRUMENTS = INSTRUMENTS;
exports.getInstrument = getInstrument;
