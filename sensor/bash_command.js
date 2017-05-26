var bash = require('../bash/bash_promise')();

module.exports = (bashCommand, resultTransformer, errorDescription) => {

  function execute() {
    return bash.execSystemCommandPromise(bashCommand)
      .then(resultTransformer)
      .catch(error => errorDescription + " " + error);
  }

  return {
    execute: execute
  }

}
