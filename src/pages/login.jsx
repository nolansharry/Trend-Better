import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          border: "1px solid black",
          padding: "40px",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <h2 style={{ color: "black" }}>Login</h2>

        <InputField type="email" placeholder="Email" />
        <InputField type="password" placeholder="Password" />
        <button
          style={{
            padding: "10px",
            borderRadius: 5,
            border: "none",
            background: "#4A90E2",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Log In
        </button>

        <div>
          <Link
            to="/register"
            style={{ color: "grey", fontSize: "16px", textDecoration: "None" }}
          >
            Dont have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
