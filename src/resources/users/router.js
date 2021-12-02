const express = require("express");
const { getUserWithGames } = require("./controller");

const router = express.Router();

router.get("/", getUserWithGames);

module.exports = router;
