// js/buffer-loader.max.js
// Inlet 0: instrument id (symbol)
// Outlet 0: read command to polybuffer~ (e.g. 'read C:/path/to/samples/irish_flute')
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
    outlet(0, 'read', SAMPLES_ROOT + inst.sampleDir);
    outlet(1, id);
}
