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
const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    res.json({
      success: true,
      message: "Review approved successfully",
      data: review
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const rejectReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    res.json({
      success: true,
      message: "Review rejected successfully",
      data: review
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      status: "pending"
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      status: "approved"
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createReview,
  getPendingReviews,
  getApprovedReviews,
  approveReview,
  rejectReview
};
