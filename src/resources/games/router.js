const express = require("express");
const {
  getAllGames,
  getOneGame,
  joinGame,
  createGame,
} = require("./controller");

const router = express.Router();

router.get("/", getAllGames);

router.get("/:id", getOneGame);

router.put("/:id/join", joinGame);

router.post("/", createGame);

module.exports = router;
