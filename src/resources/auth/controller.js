const prisma = require("../../utils/db");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/authentication");

async function signup(req, res) {
  const userToCreate = { ...req.body };

  if (!userToCreate.username || !userToCreate.password) {
    res.status(400).json({ error: "Missing information!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(userToCreate.password, 8);

    const user = await prisma.user.create({
      data: {
        ...userToCreate,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const token = createToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
}

async function login(req, res) {
  const userToFind = { ...req.body };
  const { username, password } = userToFind;

  if (!username || !password) {
    res.status(400).json({ error: "Missing information!" });
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!foundUser) {
      res.status(401).json({ error: "Not Authorized!" });
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (passwordsMatch) {
      const userToTokenize = {
        ...foundUser,
      };

      delete userToTokenize.password;

      const token = createToken(userToTokenize);

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Not Authorized!" });
    }
  } catch (error) {
    console.error("[ERROR] /login route: ", error);

    res.status(500).json({ error });
  }
}

module.exports = { signup, login };
