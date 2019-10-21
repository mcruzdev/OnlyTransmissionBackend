const jsonwebtoken = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Invalid token"
    });
  } else {
    jsonwebtoken.verify(token, global.SALT_KEY, (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: "Invalid token"
        });
      } else {
        if (decoded.roles.includes("admin")) {
          next();
        } else {
          res.status(403).json({
            message: "Unauthorized"
          });
        }
      }
    });
  }
};

module.exports = {
  isAdmin
};
