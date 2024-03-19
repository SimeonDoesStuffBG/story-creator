const asyncHandler = require("express-async-handler");
const Relation = require("../models/relationModel");
const Character = require("../models/characterModel");
const Plotpoint = require("../models/plotpointModel");
const { truncateRelationType } = require("./helperFunctions");

const prepareRelation = asyncHandler(async (req, res, next) => {
  if (
    !req.body.character1 ||
    !req.body.character2 ||
    req.body.character1 === req.body.character2
  ) {
    res.status(400);
    throw new Error("Relations must have two different characters");
  }

  //see if characters actually exist
  const characters = await Character.find({
    _id: {
      $in: [req.body.character1, req.body.character2],
    },
  });

  if (characters.length !== 2) {
    res.status(400);
    throw new Error("One or more of the characters doesn't exist");
  }

  //see if the creator is the same as the logged user
  if (req.user.id !== characters[0].creator.toString()) {
    res.status(400);
    throw new Error(
      "User is not allowed to create a relation for these characters"
    );
  }

  //see if they are made by the same creator
  if (characters[0].creator.toString() !== characters[1].creator.toString()) {
    res.status(400);
    throw new Error("Characters must be made by the same creator");
  }

  if (!req.body.start) {
    res.status(400);
    throw new Error("Relationships must have beginning");
  }

  //see if chosen plotpoints exist
  const start = await Plotpoint.findById(req.body.start);

  if (!start) {
    res.status(400);
    throw new Error("Start point does not exist");
  }

  characters.forEach((char) => {
    if (start.characters.indexOf(char) < 0) {
      Plotpoint.findByIdAndUpdate(req.body.start, {
        characters: [...start.characters, char._id],
      });
    }
  });

  const otherPlotpoints = await Plotpoint.find({ story: start.story });

  if (req.body.end) {
    const end = await Plotpoint.findById(req.body.end);

    if (!end) {
      res.status(400);
      throw new Error("End point does not exist");
    }

    if (start.story !== end.story) {
      res.status(400);
      throw new Error("Plotpoints must be of the same story");
    }

    characters.forEach((char) => {
      if (end.characters.indexOf(char) < 0) {
        Plotpoint.findByIdAndUpdate(end.body.end, {
          characters: [...end.characters, char._id],
        });
      }
    });

    if (end.timeIndex < start.timeIndex) {
      req.end = req.body.start;
      req.start = req.body.end;
    } else {
      req.start = req.body.start;
      req.end = req.body.end;
    }
  } else {
    req.start = req.body.start;
  }
  //if one or both characters isn't in the pp add them
  //if the end plotpoint exists and is before the start, swap the start and end plotpoints

  //find all plotpoints after start and before end(if it exists)
  //see if this type of relationship or one that contradicts it is in the period between the start and end(if it exists)
  next();
});

module.exports = { prepareRelation };
