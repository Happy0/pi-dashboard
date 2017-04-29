var PubSub = require('pubsub-js');
var config = require("../config.json")

module.exports = (cpuDb) => {

  function writeTemperatureEvent(time, temperatureCelcius) {
    cpuDb.writeTemperature(time, temperatureCelcius);
  }

  function storeSensorEvents() {
    PubSub.subscribe(config.cpuTemperatureTopic, writeTemperatureEvent);
  }

  return {
    storeSensorEvents: storeSensorEvents
  }
}
