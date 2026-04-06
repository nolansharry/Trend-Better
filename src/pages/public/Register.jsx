import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/InputField";
import Button from "../../components/SubmitButton";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // ✅ all state declarations were missing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
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
    if (!confirm) {
      newErrors.confirm = "Confirm password is required";
    } else if (password !== confirm) {
      newErrors.confirm = "Passwords do not match";
    }
    return newErrors;
  }

  async function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {  // ✅ catches all errors including firstName/lastName
      setErrors(newErrors);
      return;
    }

    try {
      await register(email, password, firstName, lastName); // ✅ uses AuthContext
      navigate("/login");
    } catch (err) {
      setErrors({ server: err.message });
    }
  }

  return (
    <div className="log-reg-container">
      <div className="log-reg-card">
        <h2>Create Account</h2>

        {errors.server && <p className="error-message">{errors.server}</p>}

        <InputField
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
        />
        <InputField
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
        />
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