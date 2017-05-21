var utils = require('./utils')();

module.exports = (bashCommand, resultTransformer, errorDescription) => {

  function execute() {
    return utils.execSystemCommandPromise(bashCommand)
      .then(resultTransformer)
      .catch(error => errorDescription + " " + error);
  }

  return {
    execute: execute
  }

}
