const express = require("express");
const {signupUser, loignUser} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loignUser);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
