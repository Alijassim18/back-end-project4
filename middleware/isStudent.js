module.exports = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Forbidden: student only" });
  }
  next();
};