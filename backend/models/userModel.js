const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    icon: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Image",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
