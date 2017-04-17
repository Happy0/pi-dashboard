var config = require("./config.json");
var restify = require("restify");
var Db = require("./db/init");
var CpuTemperatureDatabase = require("./db/cpu_temperature");

var Database = Db("db.sqlite3");

Database.init().then(function(database) {
  var server = restify.createServer();
  server.listen(8080, function() {
    console.log('pi-dashboard REST server %s listening at %s',
      server.name, server.url);

      var cpuTemperatureDb = CpuTemperatureDatabase(database);


  });
})
