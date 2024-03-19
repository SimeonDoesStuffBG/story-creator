const mongoose = require("mongoose");

const relationModel = mongoose.Schema({
  characterOne: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Character",
  },
  characterTwo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Character",
  },
  start: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Plotpoint",
  },
  end: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Plotpoint",
  },
  relationType: {
    type: Number,
    default: 0,
  },
});

//relation types
//0 - friends
//1 - enemies
//2 - lovers
//3 - family
//4 - alteregos
//5 - other

module.exports = mongoose.model("Relation", relationModel);
