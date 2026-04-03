// js/drone-controller.max.js
// Inlet 0: list [note, velocity] — drone note toggle
// Inlet 1: instrument id (symbol) — update drone config
// Outlet 0: list [droneIndex, onOff] — droneIndex=0-based, onOff=0|1

inlets = 2;
outlets = 1;

var INSTRUMENTS = require('instrument-config').INSTRUMENTS;
var DroneController = require('drone').DroneController;

var currentInst = INSTRUMENTS['irish_flute'];
var controller = new DroneController(currentInst.drones);

function anything() {
    if (inlet !== 1) return;
    var id = messagename;
    var inst = INSTRUMENTS[id];
    if (inst) {
        currentInst = inst;
        controller = new DroneController(inst.drones);
    }
}

function list(note, velocity) {
    if (inlet !== 0) return;
    if (velocity === 0) return;
    controller.noteOn(note);
    var drones = currentInst ? currentInst.drones : [];
    var idx = drones.indexOf(note);
    if (idx >= 0) {
        outlet(0, idx, controller.isActive(note) ? 1 : 0);
    }
}
