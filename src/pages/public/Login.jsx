import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/SubmitButton";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

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

  async function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password);  // ✅ use AuthContext login, not raw fetch
      navigate("/");
    } catch (err) {
      // ✅ map backend error messages to the right field
      if (err.message === "Invalid credentials") {
        setErrors({
          server: "Invalid email or password.",
          suggest: true,         // flag to show register suggestion
        });
      } else {
        setErrors({ server: err.message });
      }
    }
  }

  return (
    <div className="log-reg-container">
      <div className="log-reg-card">
        <h2>Login</h2>

        {errors.server && (
          <div className="error-message">
            <p>{errors.server}</p>
            {errors.suggest && (       // ✅ suggest registering on bad credentials
              <p className="log-reg-suggest">
                <Link className="log-reg-link" to="/register">Create account here.</Link>
              </p>
            )}
          </div>
        )}

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