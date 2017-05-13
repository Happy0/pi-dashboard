var PubSub = require('pubsub-js');

/* Only handle messages for a topic every 'pollEvery' milliseconds */
function pollEvery(topic, handler, pollEvery) {

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
  })
};

module.exports = {
    pollEvery : pollEvery
}
