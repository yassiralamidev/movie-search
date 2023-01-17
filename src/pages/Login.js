import React, { useState } from "react";
import "../style/login.css";
import logo from "../assets/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Home } from "./index";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  if (userId) {
    return <Home />;
  }

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token);
        localStorage.setItem("userId", user.localId);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(email);
        console.log(credential);
      });
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userId", user.localId);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setError("User Not Found !");
        } else if (error.message === "Firebase: Error (auth/wrong-password).") {
          setError("Wrong Password !");
        } else if (error.message === "Firebase: Error (auth/invalid-email).") {
          setError("Invalid Email !");
        }
      });
  };

  return (
    <div className="loginPage">
      <div className="loginPage__top">
        <img src={logo} alt="" />
        <h3>Welcome to Moviz</h3>
        <p>Please enter your details.</p>
      </div>
      <div className="loginPage__center">
        <span className="error">{error && `Error : ${error}`}</span>
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
        <button onClick={handleEmailAuth}>Log In</button>
        <span>OR</span>
        <button onClick={handleGoogleAuth}>
          <GoogleIcon sx={{ fontSize: 32, paddingRight: 1, paddingLeft: 1 }} />
          Log in with Google
        </button>
      </div>
      <div className="loginPage__bottom">
        <p>
          Don't have an account ? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
