const mongoose = require("mongoose");

const plotpointSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    characters: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Character",
    },
    timeIndex: {
      type: Number,
      default: 1,
    },
    chapterIndex: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plotpoint", plotpointSchema);
