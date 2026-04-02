function detectMode(deviceNames, searchString) {
  const search = (searchString || '').toLowerCase();

  if (search) {
    const match = deviceNames.find(n => n.toLowerCase().includes(search));
    if (match) return { mode: 'warbl', deviceName: match };
  }

  if (deviceNames.length > 0) {
    return { mode: 'keyboard', deviceName: deviceNames[0] };
  }

  return { mode: 'inactive', deviceName: null };
}

module.exports = { detectMode };
