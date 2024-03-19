const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
