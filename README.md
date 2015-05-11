# Agendra: What I'm going to do today

This is a simple web app that I use to remind myself what I mean to
do today. I don't expect it to be useful to anyone else, because it's
tailored to my own specific journal format. But hey, maybe you're
looking for an example of a simple functional application that uses
[Node][node] and [Express][express] (for web stuff), [Mocha][mocha]
and [Zombie][zombie] (for headless browser testing),
[Dropbox][dropbox] (for storage), and [Babel][babel] (for ECMAScript
6 and 7 language features). It's your lucky day!

## Background (i.e., why?)

I keep a nightly journal in Markdown format, and I store it in
Dropbox so it's available on all my devices. At some point I started
including a "What about tomorrow?" section to help me plan, which was
nice, except that sometimes it just meant that at the end of the next
day I looked at it and thought, "Ohhhh, *that's* what I was supposed
to do today!"

"Wouldn't it be better," I thought, "if that little agenda was the
first thing I saw when I looked at my phone or tablet in the
morning?" There are lots of dedicated apps that are all about daily
planning, but what I wanted was something that would help me out
without making me change my habits at all. I've got a journaling
practice that works for the first time in my life, and I don't want
to mess with it. And besides, I'm a professional web application
developer; how hard could it be?

The plan I came up with: Build a simple web app that pulls the agenda
section out of my latest journal entry and renders it as HTML, and
use [Meta Widget][meta] to display it on my Android home screen.

## Setup

If, for whatever reason, you want to try this out for yourself:

1.  Have a journal. Store the journal in a [Dropbox][dropbox] folder,
    in [Markdown][markdown] format, in files named `YYYY-MM-DD.md`.
    In each file, have a first-level header with the word "tomorrow"
    in it, followed by a bullet list of things to do. If anyone ever
    asks, I'll put up an example.
2.  Be a Dropbox developer. This app relies mostly on security
    through obscurity: I use my Dropbox key to get access to my
    Dropbox account, and host the app somewhere I haven't told you
    about. You'll need to do that too. Create a [Core API
    app][dropbox-api], authorized to access text files in all
    folders, and generate your own access token in the App Console.
1.  [Clone this repository.][clone]
2.  Configure your repo using [dotenv][dotenv]. First copy the file
    `.env.example` to `.env`, then edit `.env` to insert your own
    access token and the path to your journal folder (relative to the
    Dropbox root).
5.  [Have Node.js.][node] (On OS X, `brew install node`.)
6.  Install node packages: `npm install`
7.  Try it out, I guess? `npm start` and then go to
    `http://localhost:3000/`.
8.  Put it on [Heroku][heroku] or somewhere. Use environment
    variables in your hosting environment (e.g., `heroku config:set`)
    to do the configuration found in `.env`.

## Development?

If you want to do anything with this code, go ahead; it's available
under the free and open [ISC license][isc].

I recommend [ESLint][eslint]; the repo has a configuration file that
should work.

The tests run against a live Dropbox folder. I use one Dropbox app for
development and "production," and a separate one for testing. (The
testing app only has access to its own folder.) If you want to do
this too, put your test configuration in `.env.test`. Settings in
`.env.test` override `.env` when testing.

The tests expect that Dropbox folder to contain some specific files.
Again, if anyone ever asks, I'll make a version of those files
available.

[meta]: http://metawidget.org/
[clone]: http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository
[markdown]: http://daringfireball.net/projects/markdown/syntax
[dropbox]: https://www.dropbox.com/
[dropbox-dev]: https://www.dropbox.com/developers
[dropbox-api]: https://www.dropbox.com/developers/core/start/ruby
[dotenv]: https://github.com/motdotla/dotenv
[node]: https://nodejs.org/
[express]: http://expressjs.com/
[mocha]: http://mochajs.org/
[zombie]: http://zombie.js.org/
[babel]: http://babeljs.io/
[isc]: http://opensource.org/licenses/ISC
[eslint]: http://eslint.org/
[heroku]: http://www.heroku.com
