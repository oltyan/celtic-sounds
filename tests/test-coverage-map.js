const { buildCoverageGrid } = require('../js/coverage-map');

test('builds three rows for a 24-note range', () => {
  const coverage = {};
  for (let i = 60; i <= 83; i++) coverage[i] = 'present';
  const grid = buildCoverageGrid(coverage, [60, 83]);
  expect(grid.rows).toHaveLength(3);
});

test('each cell has note and status', () => {
  const coverage = { 60: 'present', 61: 'shifted', 62: 'gap' };
  const grid = buildCoverageGrid(coverage, [60, 62]);
  expect(grid.rows[0][0]).toEqual({ note: 60, status: 'present' });
  expect(grid.rows[0][1]).toEqual({ note: 61, status: 'shifted' });
  expect(grid.rows[0][2]).toEqual({ note: 62, status: 'gap' });
});

test('notes outside range are marked out-of-range', () => {
  const coverage = { 62: 'present' };
  const grid = buildCoverageGrid(coverage, [60, 65]);
  const cell60 = grid.rows.flat().find(c => c.note === 60);
  expect(cell60.status).toBe('gap'); // inside range but not in coverage
});
