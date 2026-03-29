import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/SubmitButton";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    if (!confirm) {
      newErrors.confirm = "Password is required";
    } else if (password !== confirm) {
      newErrors.password = "Passwords do not match";
      newErrors.confirm = "Passwords do not match";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (newErrors.email || newErrors.password || newErrors.confirm) {
      setErrors(newErrors);
      return;
    }
    // TODO: waiting for database to continue this part
    navigate("/");
  }
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
        <h2 style={{ color: "black" }}>Create Account</h2>

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />

        <Button onClick={handleSubmit}>Register</Button>

        <div>
          <Link
            to="/login"
            style={{ color: "grey", fontSize: "16px", textDecoration: "None" }}
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
