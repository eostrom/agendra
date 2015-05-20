let moment = require('moment'),
  markdown = require('markdown').markdown;

class Section {
  constructor (jsonMLElements) {
    this.jsonMLElements = jsonMLElements;
  }

  simplify () {
    // Here, we assume that the section contains a single list.
    let [[list, ...items]] = this.jsonMLElements;

    return new Section([
      [
        list,
        ...items.map(([item, ...children]) => {
          return [
            item,
            children.filter((child) => {
              return typeof child === 'string';
            }).join('')
          ];
        })
      ]
    ]);
  }

  toHTML () {
    return markdown.toHTML(['markdown', ...this.jsonMLElements]);
  }
}

class Entry {
  constructor (attrs) {
    Object.assign(this, attrs);
  }

  section (regexp) {
    let [_, ...toplevels] = markdown.parse(this.contents);
    toplevels = toplevels[Symbol.iterator]();
    let found = false;

    // Note: Not all JsonML can be destructured this way, but the
    // headers we care about can.
    for (let [tagname, attrs, text] of toplevels) {
      if (tagname === 'header' && attrs.level === 1 && text.match(regexp)) {
        found = true;
        break;
      }
    }

    if (!found) {
      return null;
    }

    let section = [];
    for (let element of toplevels) {
      let [tagname, attrs] = element;
      if (tagname === 'header' && attrs.level === 1) { break; }
      section.push(element);
    }

    return new Section(section);
  }
}

class Journal {
  constructor (dropbox, path) {
    Object.assign(this, {dropbox, path});
  }

  async latest () {
    const entries = await this._entryFilestats(),
      latest = entries.pop(),
      date = moment.utc(latest.name.replace(/.md$/, '')),
      contents = await this.dropbox.readFile(latest.path);

    return new Entry({contents, date});
  }

  async _entryFilestats () {
    const [_filenames, _dirstat, filestats] =
      await this.dropbox.readdir(this.path);

    return filestats.filter(e => /^[0-9-]*\.md$/.test(e.name));
  }
}

Object.assign(Journal, {Entry, Section});

module.exports = Journal;
