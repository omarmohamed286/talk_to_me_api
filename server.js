const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const errHandler = require("./utils/errHandler");
const handlingRoomsSocket = require("./utils/handlingRoomsSocket");
require("./db");
const authRouter = require("./routes/auth_router");
const userRouter = require("./routes/user_router");
const audioRoomRouter = require("./routes/audio_room_router");
const cronJob = require("./utils/cronJob");

const app = express();

const PORT = 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("Connected Succefully");
  console.log(socket.id);
  handlingRoomsSocket(socket, io);
});

cronJob(io);

app.use(express.json());

app.use(errHandler);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/audioRoom", audioRoomRouter);

httpServer.listen(PORT);