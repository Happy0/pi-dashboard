module.exports = (server, cpuController) => {

  function setupHandlers() {
    server.get('/cpu/recent', function(req, res, next) {
      var limit = req.params.limit ? req.params.limit : 200;
      var response = cpuController.getRecentCpuUsages(limit);

      res.send(response);

      return next();
    });
  }

  return {
    setupHandlers : setupHandlers
  }
}
