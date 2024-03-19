const asyncHandler = require("express-async-handler");
const { truncateRelationType } = require("../middleware/helperFunctions");
const Relation = require("../models/relationModel");
const Character = require("../models/characterModel");
const Plotpoint = require("../models/plotpointModel");

//@desc create new Relation
//@route POST /api/relations
//@access private
const createRelation = asyncHandler(async (req, res) => {
  const relation = await Relation.create({
    characterOne: req.body.character1,
    characterTwo: req.body.character2,
    start: req.start,
    end: req.end,
    relationType: truncateRelationType(req.body.relationType),
  });

  res.status(200).json(relation);
});

//@desc view all relations of a character
//@route GET /api/characters/:characterId/relations
//@route GET /api/plotpoints/:plotpointId/relations
//@route GET /api/stories/:storyId/relations
//@access private
const viewRelations = asyncHandler(async (req, res) => {
  let relations;
  if (req.params.characterId) {
    const characterId = req.params.characterId;

    const character = Character.findById(characterId);

    if (!character) {
      res.status(400);
      throw new Error("Character not found");
    }

    relations = await Relation.find({
      $or: [{ characterOne: characterId }, { characterTwo: characterId }],
    });
  }

  if (req.params.plotpointId) {
    const plotpointId = req.params.plotpointId;

    const plotpoint = await Plotpoint.findById(plotpointId);

    if (!plotpoint) {
      res.status(400);
      throw new Error("Plotpoint does not exist");
    }

    const relevantPlotpoints = await Plotpoint.find({
      story: plotpoint.story,
      timeIndex: { $lte: plotpoint.timeIndex },
    });

    relations = Relation.find({
      start: { $in: relevantPlotpoints },
      characterOne: { $in: plotpoint.characters },
      characterTwo: { $in: plotpoint.characters },
    });
  }

  if (req.params.storyId) {
    const storyId = req.params.storyId;

    const plotpoints = await Plotpoint.find({ story: storyId });

    if (!plotpoints) {
      res.status(400);
      throw new Error("Story has no plotpoints");
    }
    relations = await Relation.find({
      start: { $in: plotpoints.map((plot) => plot._id) },
    });
  }

  res.status(200).json(relations);
});

//@desc remove a Relation
//@route DELETE /api/relations/:id
//@access private
const deleteRelation = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const relationToDelete = await Relation.findById(id);

  if (!relationToDelete) {
    res.status(400);
    throw new Error("Relation not found");
  }

  const helperChar = await Character.findById(relationToDelete.characterOne);

  if (req.user.id !== helperChar.creator.toString()) {
    res.status(400);
    throw new Error("User not authorised");
  }

  await relationToDelete.remove();

  res.status(200).json(relationToDelete);
});

module.exports = { createRelation, viewRelations, deleteRelation };
