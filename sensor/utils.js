module.exports = () => {

  function getCurrentTimeMillis() {
    var d = new Date();
    return d.getTime();
  }

  return {
    getCurrentTimeMillis : getCurrentTimeMillis
  }
}
