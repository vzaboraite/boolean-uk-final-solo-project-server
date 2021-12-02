const express = require("express");
const { getAllGames, getOneGame, joinGame } = require("./controller");

const router = express.Router();

router.get("/", getAllGames);

router.get("/:id", getOneGame);

router.put("/:id/join", joinGame);

module.exports = router;
