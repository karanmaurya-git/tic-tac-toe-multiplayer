function Board({ board, handleClick }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 100px)",
        gap: "8px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          style={{
            width: "100px",
            height: "100px",
            fontSize: "2.5rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

export default Board;