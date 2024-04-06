const asyncHandler = require("express-async-handler");
const Character = require("../models/characterModel");
const imageModel = require("../models/imageModel");
const { addImage, deleteImage } = require("./imageController");

//@desc create new Character
//@route POST /api/characters
//@access private
const createCharacter = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Character must have a name");
  }

  const thumbnail = await addImage(req.body.thumbnail);

  const character = await Character.create({
    name: req.body.name,
    creator: req.user.id,
    description: req.body.description,
    thumbnail,
  });

  res.status(200).json(character);
});

//@desc view all characters(that belong to a user(if specified))
//@route GET /api/characters
//@route GET /api/users/:userId/characters
//@access private
const viewCharacters = asyncHandler(async (req, res) => {
  let characters;
  if (!req.params.userId) {
    characters = await Character.find();
  } else {
    characters = await Character.find({
      creator: req.params.userId,
    });
  }

  res.status(200).json(characters);
});

//@desc view specific character
//@route GET /api/characters/:id
//@access private
const viewCharacter = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const character = await Character.findById(id);

  if (!character) {
    res.status(404);
    throw new Error("Character not found");
  }

  let image = await imageModel.findById(character.image);

  res.status(200).json({
    _id: character._id,
    name: character.name,
    creator: character.creator,
    description: character.description,
    createdAt: character.createdAt,
    thumbnail: image ? image.file : undefined,
  });
});

//@desc modify a certain character
//@route PUT /api/characters/:id
//access private
const modifyCharacter = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const character = await Character.findById(id);

  if (!character) {
    res.status(400);
    throw new Error("Character not found");
  }

  if (req.user.id !== character.creator.toString()) {
    res.status(401);
    throw new Error("User not authorised to modify the character");
  }

  const updatedCharacter = await Character.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCharacter);
});

//@desc delete a certain character
//@route DELETE /api/characters/:id
//@access private
const deleteCharacter = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const characterToDelete = await Character.findById(id);

  if (!characterToDelete) {
    res.status(400);
    throw new Error("Character not found");
  }

  if (req.user.id !== characterToDelete.creator.toString()) {
    res.status(401);
    throw new Error("User not authorised");
  }

  await deleteImage(characterToDelete.thumbnail);

  await characterToDelete.remove();

  res.status(200).json(characterToDelete);
});

module.exports = {
  createCharacter,
  viewCharacters,
  viewCharacter,
  modifyCharacter,
  deleteCharacter,
};
