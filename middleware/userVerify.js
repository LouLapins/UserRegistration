  const jwt = require("jsonwebtoken");
  require("dotenv").config();


  const verifyToken = (req, res, next) => {

      const token = req.cookies.jwtToken;

      if (!token) return res.redirect("/register");

      const verifiedUser = jwt.verify(token, process.env.SECRETKEY)

      req.user = verifiedUser;

      next();

  }

  module.exports = verifyToken;