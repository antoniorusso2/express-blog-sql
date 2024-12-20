function errorHandler(err, req, res, next) {
  res.status(500);
  console.log(err);

  res.json({
    error: err.message
  });

  return;
}

module.exports = errorHandler;
