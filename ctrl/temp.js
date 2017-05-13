var PubSub = require('pubsub-js');
var config = require('../config.json');

module.exports = (tempDb) => {

  const recentTemperaturesCapacity = 200;
  const recentTemperatures = [];

  function keepRecentTemperaturesBufferUpdated() {
    PubSub.subscribe(config.cpuTemperatureTopic, (msg, data) => {
      if (recentTemperatures.length >= recentTemperaturesCapacity) {
        recentTemperatures.shift();
      }

      recentTemperatures.push(data);
    });
  }

  function getRecentTemperatures(limit) {
    return recentTemperatures.slice(-limit);
  }

  keepRecentTemperaturesBufferUpdated();

  return {
    getRecentTemperatures : getRecentTemperatures
  }

}
