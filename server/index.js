const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const rooms = require("./rooms");

const app = express();

/* ---------------- FRONTEND (Vercel) ---------------- */
const FRONTEND_URL = "https://tic-tac-toe-multiplayer-peach.vercel.app";

/* ---------------- CORS FOR EXPRESS ---------------- */
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("🎮 Tic Tac Toe Multiplayer Server Running");
});

const server = http.createServer(app);

/* ---------------- SOCKET.IO SETUP ---------------- */
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

/* ---------------- WIN CHECK ---------------- */
function checkWinner(board) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/* ---------------- SOCKET LOGIC ---------------- */
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // CREATE ROOM
  socket.on("create-room", (playerName) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    rooms[roomCode] = {
      players: [
        { id: socket.id, name: playerName, symbol: "X" }
      ],
      board: ["","","","","","","","",""],
      turn: "X",
    };

    socket.join(roomCode);
    socket.emit("room-created", roomCode);
  });

  // JOIN ROOM
  socket.on("join-room", ({ roomCode, playerName }) => {
    const room = rooms[roomCode];

    if (!room) {
      socket.emit("error-message", "Room not found");
      return;
    }

    if (room.players.length >= 2) {
      socket.emit("error-message", "Room is full");
      return;
    }

    room.players.push({
      id: socket.id,
      name: playerName,
      symbol: "O",
    });

    socket.join(roomCode);
    io.to(roomCode).emit("player-joined", room);
  });

  // MAKE MOVE
  socket.on("make-move", ({ roomCode, index, symbol }) => {
    const room = rooms[roomCode];
    if (!room) return;

    if (room.board[index] !== "") return;
    if (room.turn !== symbol) return;

    room.board[index] = symbol;

    const winner = checkWinner(room.board);

    if (winner) {
      io.to(roomCode).emit("board-updated", room);
      io.to(roomCode).emit("game-over", { winner });
      return;
    }

    const isDraw = room.board.every(cell => cell !== "");

    if (isDraw) {
      io.to(roomCode).emit("board-updated", room);
      io.to(roomCode).emit("game-over", { winner: null });
      return;
    }

    room.turn = symbol === "X" ? "O" : "X";

    io.to(roomCode).emit("board-updated", room);
  });

  // RESTART GAME
  socket.on("restart-game", (roomCode) => {
    const room = rooms[roomCode];
    if (!room) return;

    room.board = ["","","","","","","","",""];
    room.turn = "X";

    io.to(roomCode).emit("game-restarted", room);
  });

  // DISCONNECT CLEANUP
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);

    for (const code in rooms) {
      rooms[code].players = rooms[code].players.filter(p => p.id !== socket.id);

      if (rooms[code].players.length === 0) {
        delete rooms[code];
      }
    }
  });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});