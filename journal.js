let markdown = require('markdown').markdown;

class Section {
  constructor (jsonMLElements) {
    this.jsonMLElements = jsonMLElements;
  }

  toHTML () {
    return markdown.toHTML(['markdown', ...this.jsonMLElements]);
  }
}

class Entry {
  constructor (contents) {
    this.contents = contents;
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

module.exports = {
  Entry: Entry,
  Section: Section
};
