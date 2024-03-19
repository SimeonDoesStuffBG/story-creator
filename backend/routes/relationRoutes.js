const express = require("express");
const {
  createRelation,
  deleteRelation,
} = require("../controllers/relationController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { prepareRelation } = require("../middleware/relationMiddleware");

const router = express.Router();

router.route("/").post(authenticateToken, prepareRelation, createRelation);

router.route("/:id").delete(authenticateToken, deleteRelation);

module.exports = router;
