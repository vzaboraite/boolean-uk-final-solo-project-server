const prisma = require("../../utils/db");

async function getMovesByGameId(req, res) {
  console.log({ params: req.params });
  const targetId = req.params.id;
  try {
    const gameMoves = await prisma.move.findMany({
      where: {
        gameId: targetId,
      },
    });
    res.status(201).json(gameMoves);
  } catch (error) {
    console.error(`[ERROR] create /games route: `, error);

    res.status(500).json({ error });
  }
}

module.exports = { getMovesByGameId };
