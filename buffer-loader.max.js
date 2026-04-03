// js/buffer-loader.max.js
// Inlet 0: instrument id (symbol)
// Outlet 0: replace commands to polybuffer~ (replace <index> <filepath> per sample)
// Outlet 1: instrument id (forwarded to note-router and midi-router)

inlets = 1;
outlets = 2;

var INSTRUMENTS = require('instrument-config').INSTRUMENTS;
var patcherDir = this.patcher.filepath.replace(/[\\\/][^\\\/]*$/, '').replace(/\\/g, '/');
var SAMPLES_ROOT = patcherDir + '/samples/';

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
    var note, bufIndex;
    bufIndex = 1;
    for (note = range[0]; note <= range[1]; note += step) {
        outlet(0, 'replace', bufIndex, samplePath + note + '.mp3');
        bufIndex++;
    }
    outlet(1, id);
}
