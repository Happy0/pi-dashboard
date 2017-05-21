var WebSocket = require('ws');
var config = require("../config.json");
var PubSub = require('pubsub-js');

module.exports = () => {

  function tellAllWebsocketClients(wss,msg, data) {

    console.dir(data);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        var payload = {
          "msg": msg,
          "data": data
        }

        client.send(JSON.stringify(payload));
      }
    });
  }

  function startBroadcastingEvents(websocketPort) {
    var wss = new WebSocket.Server({
      perMessageDeflate: false,
      port: websocketPort
    });

    var tellAllClients = tellAllWebsocketClients.bind(null, wss);

    PubSub.subscribe(config.topics.cpuUsage, tellAllClients);
    PubSub.subscribe(config.topics.cpuTemperature, tellAllClients);
  }

  return {
    startBroadcastingSensorEvents: startBroadcastingEvents
  };
}
