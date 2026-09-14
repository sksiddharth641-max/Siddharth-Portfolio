const express = require("express");

const router = express.Router();

const contactRoutes = require("./contactRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/contact", contactRoutes);
router.use("/reviews", reviewRoutes);

router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Backend API Working"
    });

});

module.exports = router;
