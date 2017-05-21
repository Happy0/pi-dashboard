var exec = require('child_process').exec;

module.exports = () => {

  function getCurrentTimeMillis() {
    var d = new Date();
    return d.getTime();
  }

  function execSystemCommandPromise(command) {
    return new Promise((resolve, reject) => {
      exec("cat /sys/class/thermal/thermal_zone0/temp", function(stderr, stdout) {
        if (stdout) {
          resolve(stdout);
        } else {
          reject(stderr);
        }
      });
    });
  }

  return {
    getCurrentTimeMillis : getCurrentTimeMillis,
    execSystemCommandPromise : execSystemCommandPromise
  }
}
