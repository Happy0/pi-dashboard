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

  function createDisownedProcessOptions(logFile) {

    const options = {
      detached: true,
    }

    return new Promise((resolve, reject) => {
      if (logFile) {
        fs.open(logFile, 'a', (err, outFd) => {
          if (err) reject(err);

          options["stdio"] =  ['ignore', outFd, outFd];
          resolve(options);
        });
      } else {
        resolve(options);
      }
    })
  }

  function createDisownedProcessByCommand(command, logFile) {
    return createDisownedProcessOptions(logFile).then(options => {
      const childProcess = child_process.spawn(command, [], options);

      childProcess.on('error', err => console.log("error spawning disowned process by command: " + command + " error was: " + err));

      childProcess.unref();
      return childProcess;
    });
  }

  return {
    execSystemCommandPromise : execSystemCommandPromise,
    createDisownedProcessByCommand: createDisownedProcessByCommand
  }
}
