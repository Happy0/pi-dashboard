var exec = require('child_process').exec;

module.exports = () => {

  function execSystemCommandPromise(command) {
    return new Promise((resolve, reject) => {
      exec(command, function(stderr, stdout) {
        if (stdout) {
          resolve(stdout);
        } else {
          reject(stderr);
        }
      });
    });
  }

  return {
    execSystemCommandPromise : execSystemCommandPromise
  }
}
