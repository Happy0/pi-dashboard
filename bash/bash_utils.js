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

    var options = {
      detached: true,
    }

    var outfd = null;
    if (logFile) {
        outFd = fs.openSync(logFile, 'a');
        options["stdio"] = ['ignore', outFd, outFd];
    }

    const childProcess = child_process.spawn(command, null, options);
    childProcess.unref();

    if (outfd !=== null) {
      // File descriptor is now owned by the disowned child process.
      fs.close(fd);
    }
  }

  return {
    execSystemCommandPromise : execSystemCommandPromise,
    createDisownedProcessByCommand: createDisownedProcessByCommand
  }
}
