const PlayerController = require("../controllers/playerController");

const router = require("express").Router();

router.get("/", PlayerController.searchPlayers);
router.get("/:id", PlayerController.playerDetails);

module.exports = router;
