const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

// Authenticated routes
router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
