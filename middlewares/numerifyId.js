function numerifyId(req, res, next) {
  req.params.id = !isNaN(+req.params.id) ? parseInt(req.params.id) : req.params.id;
  // if (req.params.id) {
  //   req.params.id = parseInt(req.params.id);
  //   console.log(req.params.id);
  // }

  next();
}

module.exports = numerifyId;
