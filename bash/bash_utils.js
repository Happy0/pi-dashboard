const child_process = require('child_process');
const fs = require('fs');

module.exports = () => {

  function execSystemCommandPromise(command) {
    return new Promise((resolve, reject) => {
      child_process.exec(command, function(stderr, stdout) {
        if (stdout) {
          resolve(stdout);
        } else {
          reject(stderr);
        }
      });
    });
  }

  function createDisownedProcessByCommand(command, logFile) {

    var outfd = null;
    try {

      var options = {
        detached: true,
      }

      if (logFile) {
          outFd = fs.openSync(logFile, 'a');
          options["stdio"] = ['ignore', outFd, outFd];
      }

      const childProcess = child_process.spawn(command, [], options);
      childProcess.unref();

    } finally {
      if (outfd !== null) {
        // File descriptor is now owned by the disowned child process.
        fs.close(fd, function(err) {
          console.error("Error closing stdout fd for command: " + command+ " error was: " + err );
        });
      }
    }
  }

  return {
    execSystemCommandPromise : execSystemCommandPromise,
    createDisownedProcessByCommand: createDisownedProcessByCommand
  }
}
