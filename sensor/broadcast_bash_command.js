var PubSub = require('pubsub-js');
var utils = require('./utils')();

module.exports = () => {

  function getBashCommandResult(
    bashCommand,
    resultTransformer,
    errorDescription) {

    return utils.execSystemCommandPromise(bashCommand)
      .then(resultTransformer)
      .catch(error => errorDescription + " " + error);
  }

  function broadcastBashCommandResult(topic, result) {
    var date = utils.getCurrentTimeMillis();
    var payload = [date, result];

    PubSub.publish(topic, payload);
  }

  function runCommandThenBroadcast(topic, command, resultTransformer, errorDescription) {
    getBashCommandResult(command, resultTransformer, errorDescription)
      .then(result => broadcastBashCommandResult(topic, result));
  }

  return {
    broadcastBashCommandResultPeriodically: function(topic, command, resultTransformer, errorDescription, frequencyMillis) {
      const broadcastResult =
        () => runCommandThenBroadcast(topic, command, resultTransformer, errorDescription);

      setInterval(broadcastResult, frequencyMillis);
    }
  }

}
