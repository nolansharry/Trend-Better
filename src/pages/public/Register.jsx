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

//integrate this into the register to match the AuthContext

//Also add a username
// import { useAuth } from "../../context/AuthContext";  // add this

// function Register() {
//   const navigate = useNavigate();
//   const { register } = useAuth();                     // add this
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [errors, setErrors] = useState({});

//   // ... validate() stays exactly the same ...

//   async function handleSubmit() {                     // make it async
//     const newErrors = validate();
//     if (newErrors.email || newErrors.password || newErrors.confirm) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       await register(email, password);
//       navigate("/");
//     } catch (err) {
//       setErrors({ server: err.message });             // show server-side errors
//     }
//   }

//   return (
//     <div className="log-reg-container">
//       <div className="log-reg-card">
//         <h2>Create Account</h2>

//         {errors.server && <p className="error">{errors.server}</p>} {/* add this */}

//         {/* rest of your JSX stays the same */}
//       </div>
//     </div>
//   );
// }