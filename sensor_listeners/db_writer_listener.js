var PubSub = require('pubsub-js');
var config = require("../config.json")

module.exports = (cpuDb) => {

  /* Only handle messages for a topic every 'pollEvery' milliseconds */
  function subscribeLimitedMessages(topic, handler, pollEvery) {

    var lastHandled = new Date().getTime();

    PubSub.subscribe(topic, function(msg, data) {
      var timeNowMillis = new Date().getTime();

      if ( (timeNowMillis - lastHandled) >= pollEvery) {
        try {
          handler(data);
        } catch (e) {
          // I write robust code even in to programs, me ;x
          console.error("Failed to handle " + topic + " event. Error was: " + e);
        } finally {
          lastHandled = new Date().getTime();
        }
      }
    });

  }

  function writeTemperatureEvent(temperatureEvent) {
    var time = temperatureEvent[0];
    var temperature = temperatureEvent[1];

    cpuDb.writeTemperature(time, temperature);
  }

  function storeSensorEvents() {
    subscribeLimitedMessages(config.cpuTemperatureTopic, writeTemperatureEvent, config.db.storeFrequencyMillis);
  }

  return {
    storeSensorEvents: storeSensorEvents
  }
}
