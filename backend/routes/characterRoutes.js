const express = require("express");
const {
  createCharacter,
  viewCharacters,
  viewCharacter,
  modifyCharacter,
  deleteCharacter,
} = require("../controllers/characterController");
const { viewRelations } = require("../controllers/relationController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(viewCharacters).post(authenticateToken, createCharacter);

router
  .route("/:id")
  .put(authenticateToken, modifyCharacter)
  .get(viewCharacter)
  .delete(authenticateToken, deleteCharacter);

router.route("/:characterId/relations").get(viewRelations);

module.exports = router;
