function InputField({ type, placeholder, value, onChange, error }) {
  return (
    <div style={{ width: "100%" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
        style={error ? { borderColor: "var(--color-text-danger, red)" } : {}}
      />
      {error && <p style={{ color: "red", fontSize: 12, margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
}
export default InputField;