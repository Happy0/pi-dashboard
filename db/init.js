var sqlite3 = require('sqlite3').verbose();

module.exports = (dbPath) => {

  function createDatabase() {
    return new Promise(function(resolve, reject) {
      var db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        function(maybeError) {
          if (maybeError) {
            var err = "Error opening sqlite3 database at given path: " + dbPath;
            err = err + " Error was: " + maybeError;
            reject(err);
          } else {
            resolve(db)
          }
        });
    });
  }

  function createCpuTemperatureDataBase(db) {
    return new Promise(function(resolve, reject) {
      var createStatement = "CREATE TABLE IF NOT EXISTS cpu_temps (unix_timestamp INTEGER, temperature INTEGER)";
      db.run(createStatement, function(maybeError) {
        if (maybeError) {
          reject("Error creating cpu_temps table. Error was: " + maybeError);
        } else {
          resolve(db);
        }
      });
    });
  }

  return {
    init: () => {

      var initialisedDb = createDatabase().then(createCpuTemperatureDataBase)
        .catch(function(error) {
          console.info(error);
          process.exit(1);
        });

      return initialisedDb;
    }
  }
}
