const prisma = require("./db");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign({ ...user }, secretKey, { expiresIn: "1h" });
};

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  const findUser = async (error, payload) => {
    if (error) {
      throw Error({ error: "Not Authorized!" });
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!foundUser) {
      return res.status(401).end();
    }

    req.user = foundUser;

    next();
  };

  jwt.verify(token, secretKey, findUser);
};

module.exports = { createToken, protect };
