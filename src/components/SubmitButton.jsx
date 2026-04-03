function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="home-btn"
      style={{ width: "100%", background: "var(--accent)" }}
    >
      {children}
    </button>
  );
}
export default Button;
