module.exports = (req, res, next) => {
  let protected = true;

  try {
    if (protected) {
      throw "Unauthorized";
    } else {
      next();
    }
  } catch {
    res.status(401).send({
      message: "Invalid request",
    });
  }
};
