const express = require("express");
const { getUserGames } = require("./controller");

const router = express.Router();

router.get("/", getUserGames);

module.exports = router;
