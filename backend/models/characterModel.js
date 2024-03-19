const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, ["Character must have a name"]],
    },
    description: {
      type: String,
      required: false,
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

module.exports = mongoose.model("Character", characterSchema);
