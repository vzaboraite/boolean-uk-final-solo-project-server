const express = require("express");
const { getUserGames, getAllGames } = require("./controller");

const router = express.Router();

router.get("/user", getUserGames);

router.get("/", getAllGames);

module.exports = router;
