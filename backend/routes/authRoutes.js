const express = require("express");
const {signupUser, loignUser} = require("../controllers/authController");


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loignUser);

module.exports = router;
