var broadcaster = require('./broadcast_bash_command')();
var config = require('../config.json');
var Command = require('./bash_command');

module.exports = () => {

  return {
    startBroadcastingCpuUsage : (frequencyMillis) => {
      const bashCommand = "bash bash_scripts/cpu_usage.sh";
      const errorDescription = "Failed to get CPU usage. Error was: ";

      const command = Command(bashCommand, parseInt, errorDescription);

      console.info("Starting CPU usage broadcaster");

      broadcaster.broadcastBashCommandResultPeriodically(
        config.topics.cpuUsage,
         command,
         frequencyMillis);
    }
  }
}
