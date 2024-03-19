const express = require("express");
const {
  createStory,
  viewStories,
  viewStory,
  modifyStory,
  deleteStory,
} = require("../controllers/storyController");
const {
  createPlotpoint,
  viewPlotpoints,
} = require("../controllers/plotpointController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { viewRelations } = require("../controllers/relationController");

const router = express.Router();

router.route("/").get(viewStories).post(authenticateToken, createStory);

router
  .route("/:id")
  .put(authenticateToken, modifyStory)
  .get(viewStory)
  .delete(authenticateToken, deleteStory);

router
  .route("/:storyId/plotpoints")
  .post(authenticateToken, createPlotpoint)
  .get(viewPlotpoints);

router.route("/:storyId/relations").get(viewRelations);

module.exports = router;
