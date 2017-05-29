const bash = require("../bash/bash_utils")();
const config = require('../config');
const errors = require('restify-errors');

module.exports = (server) => {

  function setupHandlers() {

    server.get('/bash_commands/', function(req, res, next) {
      // list all commands
      const commandsResponse = config.bashCommands;
      res.send(commandsResponse);
      return next();
    });

    server.post('/bash_commands/:id', function(req, res, next) {
      // Execute command
      const id = req.params.id;
      var command = config.bashCommands.find(command => command.id === id);

      if (!command) {
        return next(new errors.NotFoundError());
      } else if (command.disown) {
        bash.createDisownedProcessByCommand(command.command, command.stdoutFile);

        res.send(200, 'Command started in a disowned process.');

        return next();
      }
      else {
        bash.execSystemCommandPromise(command.command)
          .then(result => res.send(200, 'ok'))
          .catch(bashError => {
            var error = new errors.InternalServerError();
            error.body.message = bashError.message;
            res.send(error)
          });
      }

      return next();
    });
  }

  return {
    setupHandlers : setupHandlers
  }
}
