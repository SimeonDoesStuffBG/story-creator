const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  createUser,
  logInUser,
  checkUser,
  checkMe,
  checkUsers,
  logoutUser,
} = require("../controllers/userController");
const { viewCharacters } = require("../controllers/characterController");
const { viewStories } = require("../controllers/storyController");

const router = express.Router();

router.post("/", createUser);

router.post("/login", logInUser);

router.post("/logout", logoutUser);

router.get("/me", authenticateToken, checkMe);

router.get("/", checkUsers);

router.get("/:userId", checkUser);

router.get("/:userId/characters", viewCharacters);

router.get("/:userId/stories", viewStories);

module.exports = router;
