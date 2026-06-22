# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🎮 Tic Tac Toe Multiplayer (React + Socket.io)

A real-time multiplayer Tic Tac Toe game built using **React (Vite)** for the frontend and **Node.js + Socket.io** for the backend. Players can create or join rooms and play instantly with real-time synchronization.

---

## 🚀 Features

* 🎮 Real-time multiplayer gameplay
* 🏠 Room creation & joining using room code
* ⚡ Instant move updates using Socket.io
* 🧠 Winner detection logic
* 🔄 Game restart functionality
* 📱 Responsive UI (works on desktop & mobile)

---

## 🧠 Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* Socket.io

---

## 📁 Project Structure

```text
TIC-TAC-TOE-MULTIPLAYER
│
├── README.md
├── .gitignore
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Board.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── socket.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
└── server/
    ├── index.js
    ├── rooms.js
    ├── package.json
    └── package-lock.json
```

---

## ⚙️ How to Run This Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/karanmaurya-git/tic-tac-toe-multiplayer.git
cd tic-tac-toe-multiplayer
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

### 3️⃣ Start the Backend Server

```bash
cd server
node index.js
```

Backend runs on:

```text
http://localhost:5000
```

### 4️⃣ Start the Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🎮 How to Play

1. Open the website.
2. Enter your name.
3. Create a room (Player 1).
4. Share the room code with a friend.
5. Friend joins using the same room code.
6. Game starts automatically.
7. Take turns as **X** and **O**.
8. Winner is detected instantly.

---

## 🔌 Socket Flow

* Player joins room
* Server assigns room
* Moves are emitted via Socket.io
* Both clients stay synchronized in real time

---

## 🔮 Future Improvements

* 🤖 Add AI (Play vs Computer mode)
* 🏆 Score tracking system
* 🎨 Better UI animations
* 🔊 Sound effects
* 🌍 Global matchmaking system

---

## 👨‍💻 Author

**Karan Maurya**
