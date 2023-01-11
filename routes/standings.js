const StandingController = require("../controllers/standingController");

const router = require("express").Router();

router.get("/", StandingController.getStandingBySeasons);

module.exports = router;
