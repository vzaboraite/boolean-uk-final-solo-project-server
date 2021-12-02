const express = require("express");
const { getAllGames } = require("./controller");

const router = express.Router();

router.get("/", getAllGames);

module.exports = router;
