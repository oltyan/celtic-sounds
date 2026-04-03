// js/midi-router.max.js
// Inlet 0: list [note, velocity]
// Inlet 1: instrument id (symbol)
// Outlet 0: melody notes [note, velocity]
// Outlet 1: drone notes [note, velocity]

inlets = 2;
outlets = 2;

var routeNote = require('midi-router').routeNote;
var currentId = 'irish_flute';

function anything(id) {
    if (inlet === 1) {
        currentId = id;
    }
}

function list(note, velocity) {
    if (inlet !== 0) return;
    var result = routeNote(note, velocity, currentId);
    if (result.destination === 'drone') {
        outlet(1, note, velocity);
    } else {
        outlet(0, note, velocity);
    }
}
