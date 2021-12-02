const prisma = require("../../utils/db");

async function getUserWithGames(req, res) {
  console.log({ USER: req.user });
  const foundUser = req.user;

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(foundUser.id),
      },
      select: {
        id: true,
        username: true,
        password: false,
        games: {
          select: {
            game: true,
          },
        },
      },
    });

    // Here in userWithGames storing data without userId and gameId from relational UsersOnGames table
    const userWithGames = {
      ...result,
      games: result.games.map((game) => {
        return game.game;
      }),
    };

    if (userWithGames !== null && userWithGames !== undefined) {
      res.status(200).json({ userWithGames });
    }
  } catch (error) {
    console.error("[ERROR] /users route: ", error);

    res.status(500).json({ error });
  }
}

module.exports = { getUserWithGames };
