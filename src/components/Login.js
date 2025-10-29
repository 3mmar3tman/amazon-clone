import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/login-logo.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
function Login() {
  const user = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((auth) => {
      if (auth) {
        navigate("/");
      }
    });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  console.log(user);

  return (
    <div className="login">
      <Link to="/">
        <img className="header-logo" src={Logo} alt="logo-img" />
      </Link>
      <div className="login-container">
        <h1>signIn</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <h5>password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button type="submit" className="login-signInBtn" onClick={signIn}>
            sign in
          </button>
          <p>
            By continuing, you agree to Amazon's Fake Clone Conditions of Use
            and Privacy Notice.
          </p>
          <button className="login-registerBtn" onClick={register}>
            Create your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
