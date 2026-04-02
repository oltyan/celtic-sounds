class DroneController {
  constructor(droneNotes) {
    this._notes = new Set(droneNotes);
    this._active = {};
    for (const n of droneNotes) this._active[n] = false;
  }

  isDroneNote(note) { return this._notes.has(note); }

  noteOn(note) {
    if (!this.isDroneNote(note)) return;
    this._active[note] = !this._active[note];
  }

  noteOff(note) {
    // Always ignored for drone notes
  }

  isActive(note) { return !!this._active[note]; }

  getState() { return { ...this._active }; }

  setState(state) {
    for (const [note, active] of Object.entries(state)) {
      const n = parseInt(note, 10);
      if (this._notes.has(n)) this._active[n] = !!active;
    }
  }
}

module.exports = { DroneController };
