const asyncHandler = require("express-async-handler");
const Image = require("../models/imageModel");
const User = require("../models/userModel");
const Story = require("../models/storyModel");
const Character = require("../models/characterModel");

const addImage = asyncHandler(async (imgUrl) => {
  if (!imgUrl) {
    return;
  }
  const imageExists = await Image.findOne({ file: imgUrl });

  if (imageExists) {
    return imageExists._id;
  } else {
    const newImage = await Image.create({ file: imgUrl });
    return newImage._id;
  }
});

const deleteImage = asyncHandler(async (id) => {
  const imageToDelete = await Image.findById(id);

  if (!imageToDelete) {
  }

  const users = await User.find({ icon: id });
  const stories = await Story.find({ thumbnail: id });
  const characters = await Character.find({ thumbnail: id });

  if (!users && !stories && !characters) {
    imageToDelete.remove();
  }
});

module.exports = { addImage, deleteImage };
