const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, ["Story must have a title"]],
    },
    characters: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Character",
    },
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Image",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);
