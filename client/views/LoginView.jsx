import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { setLogin } from '../store'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LoginView = () => {
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"];
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    })
    const requestParsed = await request.json();
    if (requestParsed) {
      if (requestParsed[1] == 400) {
        setErrorMessage("Username not found, or password is wrong!");
      }
      dispatch(setLogin({ user: requestParsed[0]["user"], token: requestParsed[0]["token"] }));
    } else {
      alert("Server Error");
    }
  }
  return (
    <>
      <Navbar />
      <div className='form-container'>
        <h1>Login</h1>
        {errorMessage &&
          <div className="error-box">
            {errorMessage}
          </div>
        }
        <form method="POST" onSubmit={(e) => handleSubmit(e)}>
          <label for="username">
            Username:
          </label><br />
          <input type="text" required id="username" className="textbox-main" onChange={(e) => setUsername(e.target.value)} /><br />
          <label for="password">
            Password:
          </label><br />
          <input type="password" className="textbox-main" required id="password" onChange={(e) => setPassword(e.target.value)} /><br />
          <button type="submit" className="main-btn">Login</button><br />
          <Link to="/register">Register instead</Link>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default LoginView