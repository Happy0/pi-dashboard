var PubSub = require('pubsub-js');
var config = require("../config.json")
var PubsubLimited = require("../pubsub/limit");

module.exports = (cpuDb) => {

  function writeTemperatureEvent(temperatureEvent) {
    var time = temperatureEvent[0];
    var temperature = temperatureEvent[1];

    cpuDb.writeTemperature(time, temperature);
  }

  function storeSensorEvents() {
    PubsubLimited.pollEvery(config.cpuTemperatureTopic, writeTemperatureEvent, config.db.storeFrequencyMillis);
  }

  return {
    storeSensorEvents: storeSensorEvents
  }
}
