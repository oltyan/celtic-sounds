// js/buffer-loader.max.js
// Inlet 0: instrument id (symbol)
// Outlet 0: read command to polybuffer~ (e.g. 'read C:/path/to/samples/irish_flute')
// Outlet 1: instrument id (forwarded to note-router and midi-router)

inlets = 1;
outlets = 2;

var INSTRUMENTS = require('instrument-config').INSTRUMENTS;
var SAMPLES_ROOT = 'C:/Users/Chris Oltyan/celtic-sounds/samples/';

function anything(id) {
    var inst = INSTRUMENTS[id];
    if (!inst) {
        post('Unknown instrument: ' + id + '\n');
        return;
    }
    outlet(0, 'read', SAMPLES_ROOT + inst.sampleDir);
    outlet(1, id);
}
