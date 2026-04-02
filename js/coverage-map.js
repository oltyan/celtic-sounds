const NOTES_PER_ROW = 8;

function buildCoverageGrid(coverage, noteRange) {
  const [min, max] = noteRange;
  const notes = [];
  for (let n = min; n <= max; n++) {
    notes.push({ note: n, status: coverage[n] || 'gap' });
  }

  const rows = [];
  for (let i = 0; i < notes.length; i += NOTES_PER_ROW) {
    rows.push(notes.slice(i, i + NOTES_PER_ROW));
  }
  return { rows, min, max };
}

module.exports = { buildCoverageGrid };
