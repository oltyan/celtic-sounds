// js/expr-mode.max.js
// Inlet 0: index (int 0-6)
// Outlet 0: mode symbol

inlets = 1;
outlets = 1;

var MODES = ['cc2', 'cc11', 'cc7', 'cc74', 'chpress', 'velocity', 'fixed'];

function msg_int(idx) {
    if (idx >= 0 && idx < MODES.length) {
        outlet(0, MODES[idx]);
    }
}
