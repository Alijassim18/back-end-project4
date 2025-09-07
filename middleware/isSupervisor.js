module.exports = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.user.role !== "supervisor") {
    return res.status(403).json({ message: "Forbidden: supervisor only" });
  }
  next();
};