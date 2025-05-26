const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/login", auth.login);
router.post("/logout", auth.logout);

router.get("/me", auth.requireAuth, (req, res) => {
  res.json({ userId: req.session.userId });
});

module.exports = router;
