const GameController = require("../controllers/gameController");

const router = require("express").Router();

router.get("/", GameController.fetchNowGames);
router.get("/:id", GameController.fetchGameDetails);

module.exports = router;
