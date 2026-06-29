const express = require("express");

const router = express.Router();

const contactRoutes = require("./contactRoutes");

router.use("/contact", contactRoutes);

router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Backend API Working"
    });

});

module.exports = router;