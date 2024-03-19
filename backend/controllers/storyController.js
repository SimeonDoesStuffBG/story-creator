const asyncHandler = require("express-async-handler");
const { setUpCharacterList } = require("../middleware/helperFunctions");
const Story = require("../models/storyModel");
const Plotpoint = require("../models/plotpointModel");
const Relation = require("../models/relationModel");
const { addImage, deleteImage } = require("./imageController");
const imageModel = require("../models/imageModel");
//@desc create new story
//@route POST /api/story
//@access private
const createStory = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Story must have a title");
  }

  const thumbnail = await addImage(req.body.thumbnail);

  const story = await Story.create({
    title: req.body.title,
    creator: req.user.id,
    characters: setUpCharacterList(req.body.characters),
    thumbnail,
  });

  res.status(200).json(story);
});

//@desc view all stories belonging to an user
//@route GET /api/stories
//@route GET /api/users/:userId/stories
//@access private
const viewStories = asyncHandler(async (req, res) => {
  let stories;

  if (!req.params.userId) {
    stories = await Story.find();
  } else {
    stories = await Story.find({
      creator: req.params.userId,
    });
  }

  res.status(200).json(stories);
});

//@desc view one story
//@route GET /api/characters/:id
//@access private
const viewStory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const story = await Story.findById(id);

  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }

  const image = await imageModel.findById(story.thumbnail);

  res.status(200).json({ ...story, thumbnail: image ? image.file : undefined });
});

//@desc modify a story
//@route PUT /api/stories/:id
//access private
const modifyStory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const story = await Story.findById(id);

  if (!story) {
    res.status(400);
    throw new Error("Story not found");
  }

  if (req.user.id !== story.creator.toString()) {
    res.status(401);
    throw new Error("User not authenticated to alter the story");
  }

  const updatedStory = await Story.findByIdAndUpdate(
    id,
    { ...req.body, characters: setUpCharacterList(req.body.characters) },
    {
      new: true,
    }
  );

  res.status(200).json(updatedStory);
});

//@desc delete a story
//@route DELETE /api/stories/:id
//@access private
const deleteStory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const storyToDelete = await Story.findById(id);

  if (!storyToDelete) {
    res.status(401);
    throw new Error("Character not found");
  }

  if (req.user.id !== storyToDelete.creator.toString()) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  const relevantPlotpoints = await Plotpoint.find({ story: id });
  const relevantRelations = await Relation.find({
    start: {
      $in: relevantPlotpoints.map((plot) => {
        plot._id;
      }),
    },
  });

  await deleteImage(storyToDelete.thumbnail);

  relevantPlotpoints.forEach(async (plotpoint) => await plotpoint.remove());
  relevantRelations.forEach(async (relation) => await relation.remove());

  await storyToDelete.remove();

  res.status(200).json(storyToDelete);
});

module.exports = {
  createStory,
  viewStories,
  viewStory,
  modifyStory,
  deleteStory,
};
