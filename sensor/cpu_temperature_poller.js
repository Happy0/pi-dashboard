var config = require("../config.json");
var broadcaster = require("./broadcast_bash_command")();
var Command = require("./bash_command");

module.exports = () => {

  return {
    startBroadcastingCPUTemperature: (frequencyMillis) => {

      const bashCommand = "cat /sys/class/thermal/thermal_zone0/tempcat /sys/class/thermal/thermal_zone0/temp";
      const errorDescription = "Failed to get CPU temperature. Error was: ";

      console.info("Starting CPU temperature broadcaster");

      const commandResultHandler = (commandResult) => commandResult / 1000;
      const command = Command(bashCommand, commandResultHandler, errorDescription);

      broadcaster.broadcastBashCommandResultPeriodically(
        config.topics.cpuTemperature,
        command,
        frequencyMillis);
    }
  }
}
