const express = require("express");
const { getMovesByGameId } = require("./controller");

const router = express.Router();

router.get("/game/:id", getMovesByGameId);

module.exports = router;
