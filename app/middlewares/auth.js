const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //   const token =
  //     req.body.token || req.query.token || req.headers["x-access-token"];

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { verifyToken };
