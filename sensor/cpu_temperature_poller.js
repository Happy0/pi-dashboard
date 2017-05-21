var PubSub = require('pubsub-js');
var config = require("../config.json");
var utils = require("./utils")();

module.exports = () => {

  function getCPUTemperature() {
    return utils.execSystemCommandPromise("cat /sys/class/thermal/thermal_zone0/temp")
      .then(result => parseInt(result) / 1000)
      .catch(error => Promise.reject("Unable to get CPU temperature. Error was: " + error));
  }

  function broadcastCurrentCpuTemperature() {
    getCPUTemperature().then(cpuTemperatureCelcius => {
      var currentTimeMillis = utils.getCurrentTimeMillis();

      var cpuTempState = [
        currentTimeMillis,
        cpuTemperatureCelcius
      ];

      PubSub.publish(config.topics.cpuTemperature, cpuTempState);

    });
  }

  return {
    startBroadcastingCPUTemperature: (frequencyMillis) => {
      setInterval(broadcastCurrentCpuTemperature, frequencyMillis);
    }
  }

}
