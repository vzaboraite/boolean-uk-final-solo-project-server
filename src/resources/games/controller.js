const prisma = require("../../utils/db");

async function getUserGames(req, res) {
  console.log({ USER: req.user });
  const foundUser = req.user;

  try {
    const games = await prisma.game.findMany({
      where: {
        users: {
          some: {
            user: {
              id: parseInt(foundUser.id),
            },
          },
        },
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    console.log(games);

    const cleanGames = games.map((game) => {
      let usersInGame = [];
      game.users.map((user) => {
        const player = user.user;
        console.log({ PLAYER: player });
        return usersInGame.push(player);
      });
      console.log({ usersInGame });

      return { ...game, users: usersInGame };
    });

    console.log({ cleanGames });

    res.status(200).json({ cleanGames });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
}

async function getAllGames(req, res) {
  try {
    const games = await prisma.game.findMany({});

    res.status(200).json({ games });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
}

module.exports = { getUserGames, getAllGames };
