let assert = require('chai').assert,
  Journal = require('../journal');

let text = `
# Section 1

Here is the text of section 1.

Section 2
=========

* Section 2 contains a list.
  * A nested list.
`.trim();


describe('Journal Entry', () => {
  describe('section()', () => {
    it('finds a section whose header matches a regexp', () => {
      let entry = new Journal.Entry(text);

      assert.instanceOf(entry.section(/Section 1/), Journal.Section);
      assert.instanceOf(entry.section(/section 2/i), Journal.Section);
      assert.notOk(entry.section(/anything else/));
    });
  });
});

describe('Journal Section', () => {
  describe('toHTML()', () => {
    it('transforms the JsonML elements to HTML', () => {
      let section = new Journal.Entry(text).section(/Section 2/);

      assert.strictEqual(section.toHTML(),
        '<ul><li>Section 2 contains a list.<ul><li>A nested list.</li></ul></li></ul>'
      );
    });
  });

  describe('simplify()', () => {
    it('returns a section containing a single-level list', () => {
      let simplifiedSection =
        new Journal.Entry(text).section(/Section 2/).simplify();

      assert.strictEqual(simplifiedSection.toHTML(),
        '<ul><li>Section 2 contains a list.</li></ul>'
      );
    });
  });
});
