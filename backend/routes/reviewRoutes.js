const express = require("express");
const router = express.Router();

const {
  createReview,
  getPendingReviews,
  getApprovedReviews,
  approveReview,
  rejectReview
} = require("../controllers/reviewController");

router.get("/pending", getPendingReviews);

router.get("/approved", getApprovedReviews);

router.post("/", createReview);

router.put("/:id/approve", approveReview);

router.put("/:id/reject", rejectReview);

module.exports = router;
