// js/warbl-detector.max.js
// Inlet 0: bang — trigger detection
// Inlet 1: MIDI device name list (from midiinfo)
// Outlet 0: mode symbol ('warbl', 'keyboard', 'inactive')
// Outlet 1: device name (symbol)

inlets = 2;
outlets = 2;

var detectMode = require('midi-detect').detectMode;

var deviceNames = [];

function bang() {
    if (inlet !== 0) return;
    var result = detectMode(deviceNames, 'warbl');
    outlet(0, result.mode);
    outlet(1, result.deviceName || 'No device');
}

function list() {
    if (inlet !== 1) return;
    deviceNames = [];
    var i;
    for (i = 0; i < arguments.length; i++) {
        deviceNames.push(arguments[i]);
    }
    bang();
}
