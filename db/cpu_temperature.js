module.exports = (db) => {

  var prepareTemperatureInsertStatement =
    new Promise(function(resolve, reject) {
      var stmt = db.prepare("INSERT INTO cpu_temps VALUES(?, ?)", function(maybeError) {
        if (maybeError) {
          reject(maybeError);
        } else {
          resolve(stmt);
        }
      })
    });

  function insertTemperature(insertTemperaturePreparedStmt, timestamp, temperature_celcius) {
    return new Promise(function(resolve, reject) {
      insertTemperaturePreparedStmt.run(timestamp, function(maybeError) {
        if (maybeError) {
          reject(maybeError);
        } else {
          resolve();
        }
      })
    });
  }

  return {
    writeTemperature: (timestamp, temperature_celcius) => {
      prepareTemperatureInsertStatement.then(stmt => insertTemperature(stmt, timestamp, temperature_celcius));
    }
  }
}
