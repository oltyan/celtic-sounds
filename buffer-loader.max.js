// js/buffer-loader.max.js
// Inlet 0: instrument id (symbol)
// Outlet 0: instrument id (forwarded to note-router, midi-router, drone-controller)

inlets = 1;
outlets = 1;

var INSTRUMENTS = require('instrument-config').INSTRUMENTS;
var patcherDir = this.patcher.filepath.replace(/[\\\/][^\\\/]*$/, '').replace(/\\/g, '/');
var SAMPLES_ROOT = patcherDir + '/samples/';

var NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
function midiToFilename(midi) {
    var octave = Math.floor(midi / 12) - 1;
    return NOTE_NAMES[midi % 12] + octave + '.mp3';
}

function bang() {
    // Ignore bangs (e.g. from live.tab initialization)
}

function anything() {
    var id = messagename;
    var inst = INSTRUMENTS[id];
    if (!inst) {
        post('Unknown instrument: ' + id + '\n');
        return;
    }
    var range = inst.range;
    var step = inst.step;
    var samplePath = SAMPLES_ROOT + inst.sampleDir + '/';
    var note, bufIndex, bufBox;
    bufIndex = 1;
    for (note = range[0]; note <= range[1]; note += step) {
        bufBox = this.patcher.getnamed('melodic_buf_' + bufIndex);
        if (bufBox) {
            bufBox.message('replace', samplePath + midiToFilename(note));
        }
        bufIndex++;
    }
    outlet(0, id);
}
