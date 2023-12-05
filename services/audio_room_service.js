const asyncHandler = require("express-async-handler");
const AudioRoom = require("../models/audio_room_model");

exports.createRoom = asyncHandler(async (req, res) => {
  const room = await AudioRoom.create({
    language: req.body.language,
    title: req.body.title,
    languageLevel: req.body.languageLevel,
    host: req.body.host,
    createdAt: Date.now(),
    lastLog: Date.now(),
  });
  room.participantsCount = 1;
  await room.save();
  res.json(room);
});

exports.getRooms = asyncHandler(async (req, res) => {
  const rooms = await AudioRoom.find({});
  res.json(rooms);
});

exports.deleteRoom = asyncHandler(async (req, res) => {
  const room = await AudioRoom.findByIdAndDelete(req.params.id);
  res.json(room);
});

exports.updateRoom = asyncHandler(async (req, res) => {
  const room = await AudioRoom.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(room);
});

exports.addParticipant = asyncHandler(async (req, res) => {
  const room = await AudioRoom.findById(req.params.id);
  room.participantsCount = room.participantsCount + 1;
  await room.save();
  res.json(room);
});

exports.removeParticipant = asyncHandler(async (req, res) => {
  const room = await AudioRoom.findById(req.params.id);
  room.participantsCount = room.participantsCount - 1;
  await room.save();
  res.json(room);
});
