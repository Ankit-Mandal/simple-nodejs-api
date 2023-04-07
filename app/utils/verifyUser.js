const jwt = require("jsonwebtoken");

const verifyUser = async (req) => {
  const { email, password } = req.body;
  console.log(email, password);
  let response;

  try {
    // if (username === "user@root.com" && password === "root") {
    if (email && password) {
      response = {
        data: {
          email: email,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }

  if (response.hasOwnProperty("data") && response.data) {
    response = response.data;
  }
  return jwt.sign({ email: response }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = { verifyUser, authenticateToken };
