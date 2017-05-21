var broadcaster = require('./broadcast_bash_command')();
var config = require('../config.json');

module.exports = () => {

  return {
    startBroadcastingCpuUsage : (frequencyMillis) => {
      const command = "bash bash_scripts/cpu_usage.sh";
      const errorDescription = "Failed to get CPU usage. Error was: ";

      console.info("Starting CPU usage broadcaster");

      broadcaster.broadcastBashCommandResultPeriodically(
        config.topics.cpuUsage,
         command,
         parseInt,
         errorDescription,
         frequencyMillis);
    }
  }
}
