const express = require("express");
const { getAllGames, getOneGame } = require("./controller");

const router = express.Router();

router.get("/", getAllGames);

router.get("/:id", getOneGame);

module.exports = router;
