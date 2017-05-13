module.exports = (server, tempCtrl) => {

  var setupHandlers = function() {

    server.get('/temperatures/recent', function(req, res, next) {
      var limit = req.params.limit ? req.params.limit : 200;
      var response = tempCtrl.getRecentTemperatures(limit);

      res.send(response);

      next();
    });

  }

  return {
    setupHandlers : setupHandlers
  }
}
