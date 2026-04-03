// js/expression-handler.max.js
// Inlet 0: value (int 0-127) — CC value or velocity
// Inlet 1: mode (symbol) — 'cc2','cc7','cc11','cc74','chpress','velocity','fixed'
// Outlet 0: gain (float 0.0–1.0)

inlets = 2;
outlets = 1;

var ccToGain = require('expression').ccToGain;
var velocityToGain = require('expression').velocityToGain;

var mode = 'cc11';

function anything() {
    if (inlet === 1) {
        mode = messagename;
    }
}

function msg_int(v) {
    if (inlet !== 0) return;
    var gain;
    if (mode === 'fixed') {
        gain = 1.0;
    } else if (mode === 'velocity') {
        gain = velocityToGain(v);
    } else {
        gain = ccToGain(v);
    }
    outlet(0, gain);
}
