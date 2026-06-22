# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


🎮 Tic Tac Toe Multiplayer (React + Socket.io)

A real-time multiplayer Tic Tac Toe game built using React (Vite) for frontend and Node.js + Socket.io for backend.
Players can create or join rooms and play instantly with real-time synchronization.

🚀 Features
🎮 Real-time multiplayer gameplay
🏠 Room creation & joining using room code
⚡ Instant move updates using Socket.io
🧠 Winner detection logic
🔄 Game restart functionality
📱 Responsive UI (works on desktop & mobile)
🧠 Tech Stack

Frontend:

React (Vite)
JavaScript
CSS

Backend:

Node.js
Express.js
Socket.io
📁 Project Structure
TIC-TAC-TOE-MULTIPLAYER/
│
├── client/                     # Frontend (React App)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images / static assets
│   │   ├── components/
│   │   │   └── Board.jsx       # Game board UI
│   │   ├── App.jsx             # Main app logic (rooms, game state)
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx            # React entry point
│   │   └── socket.js           # Socket.io client connection
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── server/                     # Backend (Socket server)
│   ├── node_modules/
│   ├── index.js                # Express + Socket.io server logic
│   ├── package.json
│   └── package-lock.json
│
├── README.md
└── .gitignore


⚙️ How to Run This Project
1️⃣ Clone the repository
git clone https://github.com/your-username/tic-tac-toe-multiplayer.git
2️⃣ Setup Frontend
cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173
3️⃣ Setup Backend
cd server
npm install
node index.js

Backend runs on:

http://localhost:5000
🎮 How to Play
Open the website
Enter your name
Create a room (Player 1)
Share room code with friend
Friend joins same room
Game starts automatically
Play turns (X and O)
Winner is detected instantly


🔌 Socket Flow
Player joins room
Server assigns room
Moves are emitted via Socket.io
Both clients stay synchronized in real time


📌 Future Improvements
🤖 Add AI (Play vs Computer mode)
🏆 Score tracking system
🎨 Better UI animations
🔊 Sound effects
🌍 Global matchmaking system


👨‍💻 Author

Karan Maurya