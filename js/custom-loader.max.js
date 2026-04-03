// js/custom-loader.max.js
// Inlet 0: file path (symbol) from dropfile
// Outlet 0: status messages for display ['status', message]
// Outlet 1: 'read <path>' command to polybuffer~

inlets = 1;
outlets = 2;

var validateInstrumentManifest = require('zip-validator').validateInstrumentManifest;

function anything(folderPath) {
    if (inlet !== 0) return;
    var f = new File(folderPath + '/instrument.json', 'read');
    if (!f.isopen) {
        outlet(0, 'error', 'No instrument.json found');
        return;
    }
    var jsonStr = f.readstring(4096);
    f.close();

    var manifest;
    try {
        manifest = JSON.parse(jsonStr);
    } catch (e) {
        outlet(0, 'error', 'instrument.json is not valid JSON');
        return;
    }

    var result = validateInstrumentManifest(manifest);
    if (result.errors.length > 0) {
        outlet(0, 'error', result.errors[0]);
        return;
    }

    outlet(0, 'success', 'Loaded: ' + manifest.name);
    outlet(1, 'read', folderPath);
}
