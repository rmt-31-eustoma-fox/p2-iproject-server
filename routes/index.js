const express = require("express");
const router = express.Router();
const Controller = require("../controllers/");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignIn);
router.get("/shows", Controller.fetchAllShows);
router.get("/shows/:id", Controller.findShowDetail);
router.use(authentication);
router.post("/shows/:id", Controller.addFavorite);
router.get("/shows/:id/review", Controller.fetchReviews);
router.post("/shows/:id/review", Controller.addReview);
router.get("/favorites", Controller.fetchFavorites);
router.get("/favorites/:showId", Controller.getFavoriteByShowId);
router.patch("/favorites/:showId/watch", Controller.updateFavoriteWatch);
router.patch("/favorites/:showId/unwatch", Controller.updateFavoriteUnwatch);
router.delete("/favorites/:showId", Controller.deleteFavorite);
router.get("/donate", Controller.getQR)
// router.put("/reviews/:id", Controller.updateReview);
// router.delete("/reviews/:id/", Controller.deleteReview);

module.exports = router;
