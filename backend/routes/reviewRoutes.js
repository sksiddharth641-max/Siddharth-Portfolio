const express = require("express");
const router = express.Router();

const {
  createReview,
  approveReview,
  rejectReview
} = require("../controllers/reviewController");

router.post("/", createReview);

router.put("/:id/approve", approveReview);

router.put("/:id/reject", rejectReview);

module.exports = router;
