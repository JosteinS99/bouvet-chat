// setter opp en socket.io server med anbefalt express og cors bibliotek i tillegg
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

// forteller socket.io at den kan motta spørringer fra adressen til front-enden på localhost:3000
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Listener for når en bruker kobler til
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Listener som ser etter sendte meldinger og broadcaster til alle andre
  // klienter bortsett fra senderen
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  // Listener for når en bruker kobler fra serveren
  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
  });
});

// ber serveren lytte på port 3002
server.listen(3002, () => {
  console.log("SERVER IS RUNNING");
});
