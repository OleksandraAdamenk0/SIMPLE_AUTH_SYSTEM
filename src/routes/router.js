const authRoutes = require("./authRouter");
const express = require('express');
const getProfile = require("../controllers/controllers");
const authenticateAccessToken = require("../middleware/authenticateAccessToken");

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/profile", authenticateAccessToken, getProfile);

module.exports = router;