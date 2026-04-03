// js/ir-loader.max.js
// Inlet 0: index (int 0-9)
// Outlet 0: 'read <path>' command to buffer~ ir_buf

inlets = 1;
outlets = 1;

var IMPULSES = ['room1','room2','room3','chamber1','chamber2','chamber3','hall1','hall2','hall3','church'];
var BASE = 'C:/Users/Chris Oltyan/celtic-sounds/impulses/ir_';

function msg_int(idx) {
    if (idx >= 0 && idx < IMPULSES.length) {
        outlet(0, 'read', BASE + IMPULSES[idx] + '.wav');
    }
}
