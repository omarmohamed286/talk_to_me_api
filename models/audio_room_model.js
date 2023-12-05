const mongoose = require("mongoose");

const AudioRoomSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
    },
    languageLevel: {
      type: String,
      required: true,
      default: "Any Level",
    },
    title: {
      type: String,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participantsCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
    },
    lastLog: {
      type: Date,
    },
  },
  { versionKey: false }
);

AudioRoomSchema.pre("find", function (next) {
  const currentDocument = this;
  currentDocument.populate({ path: "host", select: "-password" });
  next();
});

AudioRoomSchema.pre("save", function (next) {
  const currentDocument = this;
  currentDocument.populate({ path: "host", select: "-password" });
  next();
});

module.exports = mongoose.model("AudioRoom", AudioRoomSchema);
