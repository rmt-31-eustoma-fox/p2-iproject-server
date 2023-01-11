const router = require("express").Router();
const playerRouter = require("./players");
const teamRouter = require("./teams");
const standingRouter = require("./standings");
const gamesRouter = require("./games");

router.use("/games", gamesRouter);
router.use("/standings", standingRouter);
router.use("/players", playerRouter);
router.use("/teams", teamRouter);

module.exports = router;
