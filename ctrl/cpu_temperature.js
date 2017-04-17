var CpuTemperatureDb = require("../db/cpu_temperature");
var exec = require('child_process').exec;

module.exports = (db) => {

  var cpuTemperatureDb = CpuTemperatureDb(db);

  function getCurrentTimeMillis() {
    var d = new Date();
    return d.getTime();
  }

  function getCPUTemperature() {
    return new Promise((resolve, reject) => {
      exec("cat /sys/class/thermal/thermal_zone0/temp", function(stderr, stdout) {
        if (stdout) {
          var temperatureCelcius = parseInt(stdout) / 1000;
          resolve(temperatureCelcius);
        } else {
          reject("Unable to get CPU temperature. Error was: " + stderr);
        }
      });
    });
  }

  return {
    writeCurrentCpuTemperature: () => {

      getCPUTemperature().then(cpuTemperatureCelcius => {
        var currentTimeMillis = getCurrentTimeMillis();
        return cpuTemperatureDb.writeTemperature(currentTimeMillis, cpuTemperatureCelcius)
      }).catch(error =>
        console.error("Error writing temperature to database. Error was: " + error)
      );

    }
  }

}
