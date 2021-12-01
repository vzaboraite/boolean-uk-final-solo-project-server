const prisma = require("../../utils/db");

async function signup(req, res) {
  const userToCreate = { ...req.body };

  if (!userToCreate.username || !userToCreate.password) {
    res.status(400).json({ error: "Missing information!" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        ...userToCreate,
      },
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
}

module.exports = { signup };
