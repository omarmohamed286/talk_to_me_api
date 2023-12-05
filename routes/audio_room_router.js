const express = require("express");
const {
  deleteRoom,
  getRooms,
  createRoom,
  updateRoom,
  addParticipant,
  removeParticipant
} = require("../services/audio_room_service");
const {
  createRoomValidator,
  deleteRoomValidator,
} = require("../utils/validators/audio_room_validator");

const router = express.Router();

router
  .post("/", createRoomValidator, createRoom)
  .get("/", getRooms)
  .delete("/:id", deleteRoomValidator, deleteRoom)
  .post('/:id', addParticipant)
  .delete('/removeParticipant/:id', removeParticipant)
  .patch("/:id", updateRoom);

module.exports = router;
