const cron = require("node-cron");
const AudioRoom = require("../models/audio_room_model");

module.exports = (io) => {
  cron.schedule("*/5 * * * *", async () => {
    for await (const doc of AudioRoom.find()) {
      if (
        doc.participantsCount === 0 &&
        Date.now() - doc.lastLog >= 5 * 60 * 1000
      ) {
        await doc.deleteOne();
        io.emit("roomDeleted");
      }
    }
  });
};
