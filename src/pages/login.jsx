import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/SubmitButton";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    // TODO: waiting for database to continue this part
    navigate("/");
  }

  return (
    <div className="log-reg-container">
      <div className="log-reg-card">
        <h2>Login</h2>

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

        <Button onClick={handleSubmit}>Log In</Button>

        <Link className="log-reg-link" to="/register">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}
export default Login;
