var PubSub = require('pubsub-js');
var utils = require('./utils')();

module.exports = () => {

  function broadcastBashCommandResult(topic, result) {
    var date = utils.getCurrentTimeMillis();
    var payload = [date, result];

    PubSub.publish(topic, payload);
  }

  function runCommandThenBroadcastResult(topic, command) {
    command.execute()
      .then(result => broadcastBashCommandResult(topic, result));
  }

  return {
    broadcastBashCommandResultPeriodically: function(topic, command, frequencyMillis) {
      const broadcastResult =
        () => runCommandThenBroadcastResult(topic, command);

      setInterval(broadcastResult, frequencyMillis);
    }
  }

}
