var CpuTemperatureDb = require("../db/cpu_temperature");

module.exports = (db) => {

  var cpuTemperatureDb = CpuTemperatureDb(db);

  function getCurrentTimeMillis() {
    var d = new Date();
    return d.getTime();
  }

  return {
    writeCurrentCpuTemperature: () => {
      var currentTimeMillis = getCurrentTimeMillis();

      // Hardcoded for now
      var temperatureCelcius = 60;

      return cpuTemperatureDb.writeTemperature(currentTimeMillis, temperatureCelcius).catch(error =>
        console.error("Error writing temperature to database. Error was: " + error)
      );
    }
  }

}
