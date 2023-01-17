import React, { useState } from "react";
import "../style/signup.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.reloadUserInfo;
        localStorage.setItem("userId", user.localId);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setError("Password should be at least 6 characters !");
        } else if (
          error.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          setError("Email Already Exist !");
        } else if (error.message === "Firebase: Error (auth/invalid-email).") {
          setError("Invalid Email !");
        }
      });
  };

  return (
    <div className="signupPage">
      <div className="signupPage__top">
        <img src={logo} alt="" />
        <h3>Welcome to Moviz</h3>
        <p>Please enter your details.</p>
      </div>
      <div className="signupPage__center">
        <span className="error">{error && `Error : ${error}`}</span>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button onClick={handleEmailAuth}>Sign Up</button>
      </div>
      <div className="signupPage__bottom">
        <p>
          Have an account ? <NavLink to="/login">Log In</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
