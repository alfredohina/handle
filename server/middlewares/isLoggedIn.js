const isLoggedIn = () => (req, res, next) => {
    if (req.user) return next();
    res.json({ message: "Not authorized" });
  };
  module.exports = { isLoggedIn };