import "./LoginPage.css";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function LoginPage() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      localStorage.setItem("status", res.data);
      console.log(localStorage.getItem("status"));
    });
  };

  return (
    <div className="login-page">
      <div className="form-box">
        <Form>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} />
          </Form.Group>
          <Button onClick={login}>Login</Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
