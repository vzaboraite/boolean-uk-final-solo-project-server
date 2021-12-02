const prisma = require("../../utils/db");

async function getAllGames(req, res) {
  try {
    const games = await prisma.game.findMany();

    res.status(200).json({ games });
  } catch (error) {
    console.error("[ERROR] /games route: ", error);

    res.status(500).json({ error });
  }
}

async function getOneGame(req, res) {
  const targetId = parseInt(req.params.id);
  try {
    const game = await prisma.game.findFirst({
      where: {
        id: targetId,
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    const cleanResult = {
      ...game,
      users: game.users.map((user) => {
        return user.user;
      }),
    };

    res.status(200).json({ cleanResult });
  } catch (error) {
    console.error(`[ERROR] /games/${targetId} route: `, error);

    res.status(500).json({ error });
  }
}

    });

    res.status(200).json({ game });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
}

module.exports = { getAllGames, getOneGame };
