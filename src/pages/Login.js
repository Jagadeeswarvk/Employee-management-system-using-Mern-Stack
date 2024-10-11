import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [error, setError] = useState("");
  const nav = useNavigate();

=======
  const nav = useNavigate();
>>>>>>> fe21d27606e0dfbcb7a4905919436531c0531482
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/login", { userName, password })
      .then((response) => {
<<<<<<< HEAD
        localStorage.setItem("auth-token", response.data);
=======
>>>>>>> fe21d27606e0dfbcb7a4905919436531c0531482
        console.log("login successful");
        nav("/dashboard");
      })
      .catch((error) => {
<<<<<<< HEAD
        setError(error.response.data.error);
        console.log(error.response.data.error);
=======
        console.log(error);
>>>>>>> fe21d27606e0dfbcb7a4905919436531c0531482
      });
  };

  return (
    <div className="login">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            value={userName}
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
<<<<<<< HEAD
        {error && <p>{error}</p>}
=======
>>>>>>> fe21d27606e0dfbcb7a4905919436531c0531482
        <br></br>
        <button type="submit" className="login-btn">
          Login
        </button>
        <hr></hr>
        <Link to="/signup" style={{ color: "blue" }}>
          Create account
        </Link>
      </form>
    </div>
  );
}
export default Login;
