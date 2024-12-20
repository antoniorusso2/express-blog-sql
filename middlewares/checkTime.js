function checkTime(req, res, next) {
  const currentHour = new Date().getHours();

  if (currentHour <= 8 || currentHour >= 23) {
    res.send('server non disponibile');
    return;
  }

  next();
}

module.exports = checkTime;
