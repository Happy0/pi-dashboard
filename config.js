var config = null;

// TODO: Use proper argument parsing library 
if (process.argv[2]) {
  config = require("./" + process.argv[2]);
} else {
  config = require("./config.json");;
}

module.exports = config;
