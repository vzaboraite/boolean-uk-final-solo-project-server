const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const createToken = (user) =>
  jwt.sign({ ...user }, secretKey, { expiresIn: "1h" });

module.exports = { createToken };
