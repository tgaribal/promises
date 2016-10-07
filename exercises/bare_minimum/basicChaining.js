/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var prom = require ('./promiseConstructor');
var github = require ('./promisification');

var fs = Promise.promisifyAll(require('fs'));

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return prom.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(firstLine) {
      return firstLine;
    })
    .then(function (user) {
      return github.getGitHubProfileAsync(user);
    })
    .then(function (profile) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profile), 'utf8', function(err) {});
    })
    .catch(function (err) {
      console.log('OOPS!', err.message);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
