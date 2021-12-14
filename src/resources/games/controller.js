const { Color } = require(".prisma/client");
const prisma = require("../../utils/db");

async function getAllGames(req, res) {
  try {
    const games = await prisma.game.findMany({
      include: {
        users: true,
      },
    });

    res.status(200).json({ games });
  } catch (error) {
    console.error("[ERROR] /games route: ", error);

    res.status(500).json({ error });
  }
}

async function getOneGame(req, res) {
  const targetId = req.params.id;
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
        return {
          id: user.user.id,
          username: user.user.username,
          createdAt: user.createdAt,
          color: user.color,
        };
      }),
    };

    res.status(200).json({ game: cleanResult });
  } catch (error) {
    console.error(`[ERROR] /games/${targetId} route: `, error);

    res.status(500).json({ error });
  }
}

async function joinGame(req, res) {
  const targetId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await prisma.game.update({
      where: {
        gameStatusIdConnector: {
          id: targetId,
          gameStatus: "waiting",
        },
      },
      data: {
        users: {
          create: {
            user: {
              connect: {
                id: userId,
              },
            },
            color: Color.BLACK,
          },
        },
        gameStatus: "in-progress",
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
      ...result,
      users: result.users.map((user) => {
        return {
          id: user.user.id,
          username: user.user.username,
          createdAt: user.createdAt,
          color: user.color,
        };
      }),
    };

    res.status(200).json({ game: cleanResult });
  } catch (error) {
    console.error(`[ERROR] /games/${targetId}/join route: `, error);

    res.status(500).json({ error });
  }
}

async function createGame(req, res) {
  const userId = req.user.id;

  try {
    const newGame = await prisma.game.create({
      data: {
        moves: "",
        gameStatus: "waiting",
        users: {
          create: {
            user: {
              connect: {
                id: userId,
              },
            },
            color: Color.RED,
          },
        },
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

    const cleanNewGame = {
      ...newGame,
      users: newGame.users.map((user) => {
        return {
          id: user.user.id,
          username: user.user.username,
          createdAt: user.createdAt,
          color: user.color,
        };
      }),
    };

    res.status(200).json({ game: cleanNewGame });
  } catch (error) {
    console.error(`[ERROR] create /games route: `, error);

    res.status(500).json({ error });
  }
}

async function addMove(req, res) {
  const targetId = req.params.id;
  const { newMove } = req.body;
  try {
    const { moves } = await prisma.game.findFirst({
      where: {
        id: targetId,
      },
      select: {
        moves: true,
      },
    });

    const result = await prisma.game.update({
      where: {
        gameStatusIdConnector: {
          id: targetId,
          gameStatus: "in-progress",
        },
      },
      data: {
        moves: moves === "" ? newMove : `${moves}|${newMove}`,
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
      ...result,
      users: result.users.map((user) => {
        return {
          id: user.user.id,
          username: user.user.username,
          createdAt: user.createdAt,
          color: user.color,
        };
      }),
    };

    res.status(200).json({ game: cleanResult });
  } catch (error) {
    console.error(`[ERROR] /games/${targetId}/join route: `, error);

    res.status(500).json({ error });
  }
}

module.exports = { getAllGames, getOneGame, joinGame, createGame, addMove };
