const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  viewPlotpoint,
  modifyPlotpoint,
  deletePlotpoint,
} = require("../controllers/plotpointController");
const { viewRelations } = require("../controllers/relationController");
const router = express.Router();

//create
//get all for story
//router.route("/").post(authenticateToken, createPlotpoint);

//get one
//change
//delete
router
  .route("/:id")
  .get(viewPlotpoint)
  .put(authenticateToken, modifyPlotpoint)
  .delete(authenticateToken, deletePlotpoint);

router.route("/:plotpointId/relations").get(viewRelations);

module.exports = router;
