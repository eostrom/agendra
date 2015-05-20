let assert = require('chai').assert,
  sinon = require('sinon'),
  Journal = require('../journal');
require('sinon-as-promised');
sinon.assert.expose(assert, {prefix: ''});

const text = `
# Section 1

Here is the text of section 1.

Section 2
=========

* Section 2 contains a list.
  * A nested list.
`.trim();

const entry = new Journal.Entry({contents: text});

describe('Journal', () => {
  describe('latest()', () => {
    it('finds the most recent journal entry', async () => {
      const
        journalPath = '/path/',
        filePath = `${journalPath}2012-02-19.md`,
        unused = {doesAnythingUseThisObject: false},
        filestats = [
          {name: '2012-02-18.md', path: 'x'},
          {name: '2012-02-19.md', path: filePath},
          {name: '2012-02-20-not-a-journal-entry.md', path: 'x'}
        ],
        fakePromisebox = {
          readdir: sinon.stub().resolves([unused, unused, filestats]),
          readFile: sinon.stub().resolves(text)
        },
        journal = new Journal(fakePromisebox, journalPath),
        latest = await journal.latest();

      assert.equal(latest.contents, text);
      assert.equal(latest.date.format('YYYY-MM-DD'), '2012-02-19');
      assert.calledWith(fakePromisebox.readdir, journalPath);
      assert.calledWith(fakePromisebox.readFile, filePath);
    });
  });
});

describe('Journal Entry', () => {
  describe('section()', () => {
    it('finds a section whose header matches a regexp', () => {
      assert.instanceOf(entry.section(/Section 1/), Journal.Section);
      assert.instanceOf(entry.section(/section 2/i), Journal.Section);
      assert.notOk(entry.section(/anything else/));
    });
  });
});

describe('Journal Section', () => {
  describe('toHTML()', () => {
    it('transforms the JsonML elements to HTML', () => {
      let section = entry.section(/Section 2/);

      assert.strictEqual(section.toHTML(),
        '<ul><li>Section 2 contains a list.<ul><li>A nested list.</li></ul></li></ul>'
      );
    });
  });

  describe('simplify()', () => {
    it('returns a section containing a single-level list', () => {
      let simplifiedSection = entry.section(/Section 2/).simplify();

      assert.strictEqual(simplifiedSection.toHTML(),
        '<ul><li>Section 2 contains a list.</li></ul>'
      );
    });
  });
});
