var config = require("./config.json");
var restify = require("restify");
var Db = require("./db/init");
var TemperatureController = require("./ctrl/cpu_temperature");

var database = Db("db.sqlite3");

database.init().then(function(db) {
  var server = restify.createServer();
  server.listen(8080, function() {
    console.log('pi-dashboard REST server %s listening at %s',
      server.name, server.url);

    var temperatureController = TemperatureController(db);

    setInterval(temperatureController.writeCurrentCpuTemperature,
      config.pollFrequenciesMillis.temperature);
  });
});
