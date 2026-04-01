import { useState } from "react";

function Button({ children, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: 5,
        border: "none",
        background: hovered ? "#357ABD" : "#4A90E2",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      {children}
    </button>
  );
}

export default Button;