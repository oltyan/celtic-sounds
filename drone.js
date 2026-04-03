function DroneController(droneNotes) {
  this._notes = {};
  this._active = {};
  var i;
  for (i = 0; i < droneNotes.length; i++) {
    this._notes[droneNotes[i]] = true;
    this._active[droneNotes[i]] = false;
  }
}

DroneController.prototype.isDroneNote = function(note) {
  return !!this._notes[note];
};

DroneController.prototype.noteOn = function(note) {
  if (!this.isDroneNote(note)) return;
  this._active[note] = !this._active[note];
};

DroneController.prototype.noteOff = function(note) {
  // Always ignored for drone notes
};

DroneController.prototype.isActive = function(note) {
  return !!this._active[note];
};

DroneController.prototype.getState = function() {
  var state = {};
  var key;
  for (key in this._active) {
    if (this._active.hasOwnProperty(key)) {
      state[key] = this._active[key];
    }
  }
  return state;
};

DroneController.prototype.setState = function(state) {
  var key, n;
  for (key in state) {
    if (state.hasOwnProperty(key)) {
      n = parseInt(key, 10);
      if (this._notes[n]) this._active[n] = !!state[key];
    }
  }
};

exports.DroneController = DroneController;
