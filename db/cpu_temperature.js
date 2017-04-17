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

  function insertTemperature(insertTemperaturePreparedStmt, timestamp, temperatureCelcius) {
    return new Promise(function(resolve, reject) {
      insertTemperaturePreparedStmt.run(timestamp, temperatureCelcius, function(maybeError) {
        if (maybeError) {
          reject(maybeError);
        } else {
          resolve();
        }
      })
    });
  }

  return {
    writeTemperature: (timestamp, temperatureCelcius) => {
      return prepareTemperatureInsertStatement.then(stmt =>
         insertTemperature(stmt, timestamp, temperatureCelcius));
    }
  }
}
