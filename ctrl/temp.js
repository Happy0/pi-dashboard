var RollingWindow = require("./rolling_window");
var PubSub = require('pubsub-js');
var config = require('../config.json');

module.exports = (tempDb) => {

  const recentTemperaturesCapacity = 200;
  const recentTemperaturesRollingWindow = RollingWindow(recentTemperaturesCapacity);

  function keepRecentTemperaturesBufferUpdated() {
    PubSub.subscribe(config.topics.cpuTemperature, (msg, data) => {
      recentTemperaturesRollingWindow.push_item(data);
    });
  }

  function getRecentTemperatures(limit) {
    var recent = recentTemperaturesRollingWindow.getRecentItems(limit);
    return recent;
  }

  keepRecentTemperaturesBufferUpdated();

  return {
    getRecentTemperatures : getRecentTemperatures
  }

}
