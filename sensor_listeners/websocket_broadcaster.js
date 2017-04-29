var WebSocket = require('ws');
var config = require("../config.json");
var PubSub = require('pubsub-js');

module.exports = () => {

  function tellAllWebsocketClients(wss,msg, data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        var payload = {
          "msg": msg,
          "data": data
        }

        client.send(payload);
      }
    });
  }

  function startBroadcastingEvents() {
    var wss = new WebSocket.Server({
      perMessageDeflate: false,
      port: 9999
    });

    var tellAllClients = tellAllWebsocketClients.bind(null, wss);

    PubSub.subscribe(config.cpuTemperatureTopic, tellAllClients);
  }

  return {
    startBroadcastingSensorEvents: startBroadcastingEvents
  };
}
