let assert = require('assert'),
  Journal = require('../journal');

describe('Journal Entry', () => {
  describe('section()', () => {
    it('finds a section whose header matches a regexp', () => {
      let text = `
# Section 1

Here is the text of section 1.

Section 2
=========

* Section 2 contains a list.
    `.trim();
      let entry = new Journal.Entry(text);

      assert(entry.section(/Section 1/));
      assert(entry.section(/section 2/i));
      assert(!entry.section(/anything else/));
    });
  });
});
