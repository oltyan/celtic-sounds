// js/note-router.max.js
// Inlets:  0 = note list [pitch, velocity]
//          1 = instrument id (symbol)
// Outlets: 0 = poly~ messages (target, note, gate)
//          1 = debug/status

inlets = 2;
outlets = 2;

var findNearestSample = require('note-map').findNearestSample;
var INSTRUMENTS = require('instrument-config').INSTRUMENTS;

var currentInstrumentId = 'irish_flute';
var voices = [];
var i;
for (i = 0; i < 8; i++) voices[i] = null;

// Inlet 1: set instrument id
function anything(id) {
  if (inlet !== 1) return;
  if (INSTRUMENTS[id]) {
    currentInstrumentId = id;
    outlet(1, 'instrument', id);
  }
}

// Inlet 0: note list [pitch, velocity]
function list(pitch, velocity) {
  if (inlet !== 0) return;
  if (velocity > 0) {
    noteOn(pitch, velocity);
  } else {
    noteOff(pitch);
  }
}

function noteOn(pitch, velocity) {
  var inst = INSTRUMENTS[currentInstrumentId];
  var available = buildSampleList(inst);
  var lookup = findNearestSample(pitch, available);
  var bufIndex = Math.floor((lookup.sampleNote - inst.range[0]) / inst.step) + 1;
  var bufName = 'melodic_buf.' + bufIndex;
  var rate = lookup.rate;

  var voice = allocateVoice(pitch);

  outlet(0, 'target', voice + 1);
  outlet(0, 'note', bufName, rate);
  outlet(0, 'target', voice + 1);
  outlet(0, 1);
}

function noteOff(pitch) {
  var voice = findVoice(pitch);
  if (voice === -1) return;
  outlet(0, 'target', voice + 1);
  outlet(0, 0);
  voices[voice] = null;
}

function allocateVoice(pitch) {
  var j;
  for (j = 0; j < 8; j++) {
    if (voices[j] === null) {
      voices[j] = pitch;
      return j;
    }
  }
  // All busy: steal voice 0
  voices[0] = pitch;
  return 0;
}

function findVoice(pitch) {
  var j;
  for (j = 0; j < 8; j++) {
    if (voices[j] === pitch) return j;
  }
  return -1;
}

function buildSampleList(inst) {
  var notes = [];
  var n;
  for (n = inst.range[0]; n <= inst.range[1]; n += inst.step) {
    notes.push(n);
  }
  return notes;
}
