import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/signup", { userName, email, password })
      .then((response) => {
        console.log("signup successful", response.data);
        nav("/");
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      });
  };

  return (
    <div className="login">
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
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
        {error && <p>{error}</p>}
        <br></br>
        <button type="submit" className="login-btn">
          Signup
        </button>
        <hr></hr>
        <Link to="/" style={{ color: "blue" }}>
          Already have an account
        </Link>
      </form>
    </div>
  );
}
export default Signup;
