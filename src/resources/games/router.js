const express = require("express");
const {
  getAllGames,
  getOneGame,
  joinGame,
  createGame,
  addMove,
} = require("./controller");

const router = express.Router();

router.get("/", getAllGames);

router.get("/:id", getOneGame);

router.put("/:id/join", joinGame);

router.put("/:id/move-piece", addMove);

router.post("/", createGame);

module.exports = router;
