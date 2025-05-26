const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviewController");

router.get("/", ctrl.getAllReviews);
router.get("/:id", ctrl.getReviewById);
router.post("/", ctrl.createReview);
router.put("/:id", ctrl.updateReview);
router.delete("/:id", ctrl.deleteReview);

module.exports = router;
