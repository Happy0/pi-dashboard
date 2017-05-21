var config = require("../config.json");
var PubSub = require('pubsub-js');
var utils = require('./utils.js')();

module.exports = () => {

  function getCurrentCpuUsage() {
    const time = utils.getCurrentTimeMillis();
    return utils.execSystemCommandPromise("../bash_scripts/cpu_usage.sh")
      .then(parseInt)
      .catch(error => Promise.failure("Failed to get CPU usage. Error was: " + error));
  }

  function broadcastCurrentCpuUsage() {
    getCurrentCpuUsage().then(cpuUsage => {
      var date = utils.getCurrentTimeMillis()
      var payload = [date, cpuUsage];

      PubSub.publish(config.topics.cpuUsage, payload);
    });
  }

  return {
    startBroadcastingCpuUsage : (frequencyMillis) => {
      setInterval(broadcastCurrentCpuUsage, frequencyMillis)
    }
  }
}
