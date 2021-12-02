const prisma = require("../../utils/db");

async function getAllGames(req, res) {
  try {
    const games = await prisma.game.findMany();

    res.status(200).json({ games });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
}

module.exports = { getAllGames };
