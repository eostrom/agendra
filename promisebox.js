/**
 * Wraps a Dropbox API Client in promises.
 */

class Client {
  constructor (client) {
    this.client = client;
  }

  readdir (path) {
    return new Promise((resolve, reject) => {
      this.client.readdir(path, (error, ...results) => {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  }

  readFile (path) {
    return new Promise((resolve, reject) => {
      this.client.readFile(path, (error, contents) => {
        if (error) {
          return reject(error);
        }

        resolve(contents);
      });
    });
  }
}

module.exports = Client;
