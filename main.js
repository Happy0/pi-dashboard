var config = require("./config.json");
var restify = require("restify");

var Db = require("./db/init");
var CpuTemperatureDb = require("./db/cpu_temperature");

var TemperatureSensor = require("./sensor/cpu_temperature_poller");

var WebSocketBroadcaster = require("./sensor_listeners/websocket_broadcaster");
var DbWriter = require("./sensor_listeners/db_writer_listener");

var database = Db(config.db.path);

database.init().then(function(initialisedDb) {
  var server = restify.createServer();
  server.listen(8080, function() {
    console.log('pi-dashboard REST server %s listening at %s',
      server.name, server.url);

    var temperatureSensor = TemperatureSensor();
    var webSocketBroadcaster = WebSocketBroadcaster();

    var cpuTemperatureDb = CpuTemperatureDb(initialisedDb);
    var dbWriter = DbWriter(cpuTemperatureDb);

    temperatureSensor.startBroadcastingCPUTemperature(
      config.pollFrequenciesMillis.temperature
    );

    webSocketBroadcaster.startBroadcastingSensorEvents();
    dbWriter.storeSensorEvents();

  });
});
