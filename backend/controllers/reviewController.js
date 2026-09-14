const Review = require("../models/Review");

// Submit a new review
const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      projectType: req.body.projectType,
      rating: req.body.rating,
      review: req.body.review,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully. It is waiting for approval.",
      data: review
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createReview
};
