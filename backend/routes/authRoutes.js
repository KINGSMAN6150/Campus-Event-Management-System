const express = require("express");
const {signupUser, loignUser} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware")


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loignUser);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin-test", protect, authorize("admin")), 
(req, res) => {
    res.json({ message : "Welcome Admin"})
}

module.exports = router;
