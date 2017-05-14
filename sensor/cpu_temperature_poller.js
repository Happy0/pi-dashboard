var exec = require('child_process').exec;
var PubSub = require('pubsub-js');
var config = require("../config.json");

module.exports = () => {

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

  function broadcastCurrentCpuTemperature() {
    getCPUTemperature().then(cpuTemperatureCelcius => {
      var currentTimeMillis = getCurrentTimeMillis();

      var cpuTempState = [
        currentTimeMillis,
        cpuTemperatureCelcius
      ];

      PubSub.publish(config.topics.cpuTemperature, cpuTempState);

    }).catch(error =>
      console.error("Error publishing CPU temperature. Error was:\n\n " + error)
    );
  }

  return {
    startBroadcastingCPUTemperature: (frequencyMillis) => {
      setInterval(broadcastCurrentCpuTemperature, frequencyMillis);
    }
  }

}
