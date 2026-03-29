function InputField({ type, placeholder, value, onChange, error }) {
  return (
    <div style={{ width: "100%" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: 5,
          border: error ? "1px solid red" : "1px solid #ccc",
          boxSizing: "border-box",
          background: "white",
          color: "black",
          outline: error ? "none" : undefined,
        }}
      />
      {error && <p style={{ color: "red", fontSize: 12, margin: 0 }}>{error}</p>}
    </div>
  );
}

export default InputField;