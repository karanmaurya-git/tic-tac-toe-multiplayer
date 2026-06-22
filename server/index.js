
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const rooms = require("./rooms");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Winner Checker
function checkWinner(board) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of wins) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // CREATE ROOM
  socket.on("create-room", (playerName) => {
    const roomCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    rooms[roomCode] = {
      players: [
        {
          id: socket.id,
          name: playerName,
          symbol: "X",
        },
      ],
      board: ["", "", "", "", "", "", "", "", ""],
      turn: "X",
    };

    socket.join(roomCode);

    socket.emit("room-created", roomCode);

    console.log("Room Created:", roomCode);
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

    console.log(`${playerName} joined ${roomCode}`);
  });

  // MAKE MOVE
  socket.on("make-move", ({ roomCode, index, symbol }) => {
    const room = rooms[roomCode];

    if (!room) return;

    // Cell already occupied
    if (room.board[index] !== "") return;

    // Wrong turn
    if (room.turn !== symbol) {
      console.log("Wrong turn");
      return;
    }

    room.board[index] = symbol;

    // Winner check
    const winner = checkWinner(room.board);

    if (winner) {
      io.to(roomCode).emit("board-updated", {
        board: room.board,
        turn: room.turn,
      });

      io.to(roomCode).emit("game-over", {
        winner,
      });

      console.log(`Winner: ${winner}`);
      return;
    }

    // Draw check
    const isDraw = room.board.every(
      (cell) => cell !== ""
    );

    if (isDraw) {
      io.to(roomCode).emit("board-updated", {
        board: room.board,
        turn: room.turn,
      });

      io.to(roomCode).emit("game-over", {
        winner: null,
      });

      console.log("Draw Game");
      return;
    }

    // Change turn
    room.turn = symbol === "X" ? "O" : "X";

    io.to(roomCode).emit("board-updated", {
      board: room.board,
      turn: room.turn,
    });

    console.log(`Move: ${symbol} at ${index}`);
    console.log(`Next Turn: ${room.turn}`);
  });

  // RESTART GAME
  socket.on("restart-game", (roomCode) => {
    const room = rooms[roomCode];

    if (!room) return;

    room.board = [
      "", "", "",
      "", "", "",
      "", "", ""
    ];

    room.turn = "X";

    io.to(roomCode).emit("game-restarted", {
      board: room.board,
      turn: room.turn,
    });

    console.log(`Game Restarted: ${roomCode}`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

