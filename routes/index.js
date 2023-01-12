const router = require("express").Router();
const playerRouter = require("./players");
const teamRouter = require("./teams");
const standingRouter = require("./standings");
const gamesRouter = require("./games");
const SeasonController = require("../controllers/seasonController");

router.use("/games", gamesRouter);
router.use("/standings", standingRouter);
router.use("/players", playerRouter);
router.use("/teams", teamRouter);
router.get("/seasons", SeasonController.getAllSeasons);

module.exports = router;
