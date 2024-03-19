const asyncHandler = require("express-async-handler");
const { setUpCharacterList } = require("../middleware/helperFunctions");
const Plotpoint = require("../models/plotpointModel");
const Relation = require("../models/relationModel");

//@desc creates new plotpoit
//@route POST api/stories/:storyId/plotpoints
//@access private
const createPlotpoint = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("No user logged in!");
  }
  if (!req.params.storyId) {
    res.status(400);
    throw new Error("No story to add plotpoint to");
  }

  const plotpoint = await Plotpoint.create({
    name: req.body.name,
    creator: req.user.id,
    story: req.params.storyId,
    description: req.body.description,
    characters: setUpCharacterList(req.body.characters),
    timeIndex: req.body.timeIndex,
    chapterIndex: req.body.chapterIndex,
  });

  res.status(200).json(plotpoint);
});

//@desc view all plotpoints from a certain story
//@route GET /api/stories/:storyId/plotpoints
const viewPlotpoints = asyncHandler(async (req, res) => {
  if (!req.params.storyId) {
    res.status(400);
    throw new Error("No story selected");
  }
  const plotpoints = await Plotpoint.find({ story: req.params.storyId });

  res.status(200).json(plotpoints);
});

//@desc view single plotpoint
//@route GET /api/plotpoints/:id
//@access private
const viewPlotpoint = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const plotpoint = await Plotpoint.findById(id);

  if (!plotpoint) {
    res.status(400);
    throw new Error("Plotpoint does not exist");
  }

  res.status(200).json(plotpoint);
});

//@desc modify plotpoint
//@route PUT /api/plotpoints/:id
//@access private
const modifyPlotpoint = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("No user logged in");
  }

  const id = req.params.id;
  const plotpoint = await Plotpoint.findById(id);

  if (!plotpoint) {
    res.status(400);
    throw new Error("Plotpoint not found");
  }

  if (req.user.id !== plotpoint.creator.toString()) {
    res.status(400);
    throw new Error("User not authorised to modify this plotpoint");
  }

  const updatedPlotpoint = await Plotpoint.findByIdAndUpdate(
    id,
    { ...req.body, characters: setUpCharacterList(req.body.characters) },
    { new: true }
  );

  res.status(200).json(updatedPlotpoint);
});

//@desc delete plotpoint
//@route DELETE /api/plotpoints/:id
//@access private
const deletePlotpoint = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const plotpointToDelete = await Plotpoint.findById(id);

  if (!plotpointToDelete) {
    res.status(400);
    throw new Error("Plotpoint not found");
  }

  if (req.user.id !== plotpointToDelete.creator.toString()) {
    res.status(400);
    throw new Error("User not authorised");
  }

  const relationsToDelete = await Relation.find({ start: id });

  relationsToDelete.forEach(async (relation) => await relation.remove());

  const relationsToChange = await Relation.find({ end: id });

  relationsToChange.forEach(
    async (relation) =>
      await Relation.findByIdAndUpdate(relation._id, { end: undefined })
  );

  await plotpointToDelete.remove();

  res.status(200).json(plotpointToDelete);
});

module.exports = {
  createPlotpoint,
  viewPlotpoints,
  viewPlotpoint,
  modifyPlotpoint,
  deletePlotpoint,
};
