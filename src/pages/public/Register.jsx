import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/SubmitButton";

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

  async function handleSubmit() {
    const newErrors = validate();
    if (newErrors.email || newErrors.password || newErrors.confirm) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();

      if(!response.ok)
      {
        setErrors({email: data.error || "Registration Failed"});
        return;
      }

      alert("Registration Successful! You can now log in.");
      navigate("/login");
    } catch(err) {
      console.error("Failed to connect to the server:", err);
      setErrors({email: "Server error. Is the backend running? "});
    }
  }
  return (
    <div className="log-reg-container">
      <div className="log-reg-card">
        <h2>Create Account</h2>

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
          <Link className="log-reg-link" to="/login">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
