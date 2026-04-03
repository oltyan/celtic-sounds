function detectMode(deviceNames, searchString) {
  var search = (searchString || '').toLowerCase();
  var i, name;

  if (search) {
    for (i = 0; i < deviceNames.length; i++) {
      name = deviceNames[i];
      if (name.toLowerCase().indexOf(search) >= 0) {
        return { mode: 'warbl', deviceName: name };
      }
    }
  }

  if (deviceNames.length > 0) {
    return { mode: 'keyboard', deviceName: deviceNames[0] };
  }

  return { mode: 'inactive', deviceName: null };
}

module.exports = { detectMode: detectMode };
