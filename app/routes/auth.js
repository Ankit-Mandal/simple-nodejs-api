// Resource: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userUtils = require("../utils/user");

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All inputs are required" });
    }

    const oldUser = await userUtils.getUser(email);

    if (oldUser) {
      return res.status(409).json({ message: "Email already in use!" });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await userUtils.createUser(email, encryptedPassword);

    // return new user
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All inputs are required" });
    }

    const user = await userUtils.getUser(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Username or password incorrect!" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      res.status(404).json({ message: "Username or password incorrect!" });
    }

    const token = jwt.sign(
      { email, password: user.password },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ id: user.id, email: user.email, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
