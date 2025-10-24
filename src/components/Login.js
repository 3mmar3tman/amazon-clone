import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/login-logo.png";
import "./Login.css";
function Login() {
  return (
    <div className="login">
      <Link to="/">
        <img className="header-logo" src={Logo} alt="logo-img" />
      </Link>
      <div className="login-container">
        <h1>signIn</h1>
        <form>
          <h5>Email</h5>
          <input type="email" value="" />
          <h5>password</h5>
          <input type="password" value="" />
          <button type="submit " className="login-signInBtn">
            sign in
          </button>
          <p>
            By continuing, you agree to Amazon's Fake Clone Conditions of Use
            and Privacy Notice.
          </p>
          <button className="login-registerBtn">
            Create your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
