const test = require('node:test');
const assert = require('node:assert');
const { formatTrackingLabel } = require('../dist/index.js');

test('formats a tracking label', () => {
  assert.strictEqual(formatTrackingLabel('ups', '1Z999'), 'UPS:1Z999');
});
