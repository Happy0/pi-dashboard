var config = require("./config.json");
var restify = require("restify");

var Db = require("./db/init");
var CpuTemperatureDb = require("./db/cpu_temperature");

var TemperatureSensor = require("./sensor/cpu_temperature_poller");

var WebSocketBroadcaster = require("./sensor_listeners/websocket_broadcaster");
var DbWriter = require("./sensor_listeners/db_writer_listener");

var database = Db(config.db.path);

var TemperatureController = require("./ctrl/temp");
var TemperatureRestHandler = require("./rest/temperature");

function startSensors() {
  var temperatureSensor = TemperatureSensor();
  temperatureSensor.startBroadcastingCPUTemperature(
    config.pollFrequenciesMillis.temperature
  );
}

function startSensorListeners(cpuTemperatureDb) {
  var webSocketBroadcaster = WebSocketBroadcaster();
  webSocketBroadcaster.startBroadcastingSensorEvents(config.server.websocketPort);

  var dbWriter = DbWriter(cpuTemperatureDb);
  dbWriter.storeSensorEvents();
}

function createRestHandlers(restifyServer, cpuTemperatureDb) {
  var temperatureController = TemperatureController(cpuTemperatureDb);
  var temperatureRestHandler = TemperatureRestHandler(restifyServer, temperatureController);
  temperatureRestHandler.setupHandlers();
};

database.init().then(function(initialisedDb) {
  var restifyServer = restify.createServer();
  restifyServer.use(restify.queryParser());

  restifyServer.use(restify.CORS());

  restifyServer.listen(8080, function() {
    console.log('pi-dashboard REST server %s listening at %s',
      restifyServer.name, restifyServer.url);

    var cpuTemperatureDb = CpuTemperatureDb(initialisedDb);

    startSensors();
    startSensorListeners(cpuTemperatureDb);
    createRestHandlers(restifyServer, cpuTemperatureDb);

  });
});
