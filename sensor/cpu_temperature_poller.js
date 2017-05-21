var config = require("../config.json");
var broadcaster = require("./broadcast_bash_command")();

module.exports = () => {

  return {
    startBroadcastingCPUTemperature: (frequencyMillis) => {

      const command = "cat /sys/class/thermal/thermal_zone0/tempcat /sys/class/thermal/thermal_zone0/temp";
      const errorDescription = "Failed to get CPU temperature. Error was: ";

      console.info("Starting CPU temperature broadcaster");

      var commandResultHandler = (commandResult) => commandResult / 1000;

      broadcaster.broadcastBashCommandResultPeriodically(
        config.topics.cpuTemperature,
        command,
        commandResultHandler,
        errorDescription,
        frequencyMillis);
    }
  }
}
