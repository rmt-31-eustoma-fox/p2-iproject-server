const TeamController = require("../controllers/teamControllers");

const router = require("express").Router();

router.get("/", TeamController.getAllTeams);
router.get("/:id", TeamController.getTeamDetail);

module.exports = router;
