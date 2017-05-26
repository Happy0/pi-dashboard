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

    server.post('/bash_commands/:id:', function(req, res, next) {
      // Execute command
      const id = req.params.id;
      var command = config.bashCommands.find(command => command.id === id);

      if (command) {
        //TODO: Execute it.
        res.send(200, 'ok');
      }
      else {
        return next(new errors.NotFoundError());
      }

      return next();
    });
  }

  return {
    setupHandlers : setupHandlers
  }
}
