const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authenticateToken = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      decoded = await jwt.verify(token, process.env.JWT_SECRET);

      //get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.json(401);
        throw new Error("User does not exist");
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { authenticateToken, generateToken };
