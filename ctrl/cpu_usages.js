var RollingWindow = require("./rolling_window");
var PubSub = require("pubsub-js");
var config = require("../config.json");

module.exports = () => {

  const recentCpuUsageCapacity = 200;
  const recentCpuUsageRollingWindow = RollingWindow(recentCpuUsageCapacity);

  function keepRecentCpuUsagesUpdated () {
    PubSub.subscribe(config.topics.cpuUsage, (msg, data) => {
      recentCpuUsageRollingWindow.push_item(data);
    });
  }

  function getRecentCpuUsages (limit) {
    return recentCpuUsageRollingWindow.getRecentItems(limit);
  }

  keepRecentCpuUsagesUpdated();

  return {
    getRecentCpuUsages : getRecentCpuUsages
  }
}
