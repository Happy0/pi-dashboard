var config = require("./config.json");
var restify = require("restify");
var Db = require("./db/init");
var TemperatureSensor = require("./sensor/cpu_temperature_poller");
var WebSocketBroadcaster = require("./sensor_listeners/websocket_broadcaster");

var database = Db("db.sqlite3");

database.init().then(function(db) {
  var server = restify.createServer();
  server.listen(8080, function() {
    console.log('pi-dashboard REST server %s listening at %s',
      server.name, server.url);

    var temperatureSensor = TemperatureSensor();
    var webSocketBroadcaster = WebSocketBroadcaster();

    temperatureSensor.startBroadcastingCPUTemperature(
      config.pollFrequenciesMillis.temperature
    );

    webSocketBroadcaster.startBroadcastingSensorEvents();

  });
});
