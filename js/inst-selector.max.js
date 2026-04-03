// js/inst-selector.max.js
// Inlet 0: tab index (int 0-7)
// Outlet 0: instrument id (symbol)

inlets = 1;
outlets = 1;

var IDS = [
    'tin_whistle', 'irish_flute', 'uilleann_pipes', 'anglo_concertina',
    'accordion', 'highland_bagpipe', 'smallpipes', 'sackpipa'
];

function msg_int(idx) {
    if (idx >= 0 && idx < IDS.length) {
        outlet(0, IDS[idx]);
    }
}
