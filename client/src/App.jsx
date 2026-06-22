import { useEffect, useState } from "react";
import { socket } from "./socket";
import Board from "./components/Board";

function App() {
const [playerName, setPlayerName] = useState("");
const [roomCode, setRoomCode] = useState("");
const [createdRoom, setCreatedRoom] = useState("");
const [players, setPlayers] = useState([]);
const [message, setMessage] = useState("");
const [playerSymbol, setPlayerSymbol] = useState("");

const [board, setBoard] = useState([
"", "", "",
"", "", "",
"", "", ""
]);

const [currentTurn, setCurrentTurn] = useState("X");
const [winner, setWinner] = useState(null);
const [isDraw, setIsDraw] = useState(false);

useEffect(() => {
socket.on("room-created", (code) => {
setCreatedRoom(code);
setRoomCode(code);
setPlayerSymbol("X");

  setPlayers([
    {
      id: socket.id,
      name: playerName,
      symbol: "X",
    },
  ]);
});

socket.on("player-joined", (room) => {
  setPlayers(room.players);
  setMessage("Both players connected! 🎉");

  const me = room.players.find(
    (player) => player.id === socket.id
  );

  if (me) {
    setPlayerSymbol(me.symbol);
  }
});

socket.on("board-updated", (data) => {
  setBoard(data.board);
  setCurrentTurn(data.turn);
});

socket.on("game-over", (data) => {
  if (data.winner) {
    setWinner(data.winner);
  } else {
    setIsDraw(true);
  }
});

socket.on("game-restarted", (data) => {
  setBoard(data.board);
  setCurrentTurn(data.turn);
  setWinner(null);
  setIsDraw(false);
});

socket.on("error-message", (msg) => {
  alert(msg);
});

return () => {
  socket.off("room-created");
  socket.off("player-joined");
  socket.off("board-updated");
  socket.off("game-over");
  socket.off("game-restarted");
  socket.off("error-message");
};

}, []);

const createRoom = () => {
if (!playerName.trim()) {
alert("Enter your name");
return;
}

socket.emit("create-room", playerName);


};

const joinRoom = () => {
if (!playerName.trim()) {
alert("Enter your name");
return;
}


if (!roomCode.trim()) {
  alert("Enter room code");
  return;
}

socket.emit("join-room", {
  roomCode,
  playerName,
});

};

const handleClick = (index) => {
if (players.length < 2) {
alert("Waiting for second player");
return;
}

if (board[index] !== "") return;
if (winner || isDraw) return;

socket.emit("make-move", {
  roomCode,
  index,
  symbol: playerSymbol,
});

};

const restartGame = () => {
socket.emit("restart-game", roomCode);
};

return (
<div style={{ textAlign: "center", marginTop: "50px" }}> <h1>🎮 Multiplayer Tic Tac Toe</h1>

  <input
    type="text"
    placeholder="Enter your name"
    value={playerName}
    onChange={(e) => setPlayerName(e.target.value)}
  />

  <br />
  <br />

  <button onClick={createRoom}>
    Create Room
  </button>

  <hr />

  <input
    type="text"
    placeholder="Room Code"
    value={roomCode}
    onChange={(e) =>
      setRoomCode(e.target.value.toUpperCase())
    }
  />

  <br />
  <br />

  <button onClick={joinRoom}>
    Join Room
  </button>

  {createdRoom && (
    <>
      <hr />
      <h2>Room Created: {createdRoom}</h2>
      <p>Your Symbol: {playerSymbol}</p>
    </>
  )}

  {message && (
    <>
      <hr />
      <h2>{message}</h2>
    </>
  )}

  {players.length > 0 && (
    <>
      <h3>Players</h3>

      {players.map((player) => (
        <p key={player.id}>
          {player.name} ({player.symbol})
        </p>
      ))}

      <h3>Your Symbol: {playerSymbol}</h3>

     {!winner && !isDraw && (
      <h3>
      {currentTurn === playerSymbol
      ? "🟢 Your Turn"
      : "⏳ Opponent's Turn"}
      </h3>
      )}

      {winner && (
        <h2>🏆 Winner: {winner}</h2>
      )}

      {isDraw && (
        <h2>🤝 Match Draw!</h2>
      )}

      <Board
        board={board}
        handleClick={handleClick}
      />

      <br />
      <br />

      <button onClick={restartGame}>
        🔄 Restart Game
      </button>
    </>
  )}
</div>


);
}

export default App;
