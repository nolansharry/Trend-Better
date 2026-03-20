function InputField({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: 5,
        border: "1px solid #ccc",
      }}
    />
  );
}
export default InputField;
