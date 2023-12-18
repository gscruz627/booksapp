import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { setLogin } from "../store.js"
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const RegisterView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username.length <= 3) {
      setErrorMessage("Username length needs 3+ length")
      return
    }
    if (username == password) {
      setErrorMessage("Username can't be password")
      return
    }
    if (password.length <= 6) {
      setErrorMessage("Password length needs 6+ length")
      return
    }
    if (password != checkPassword) {
      setErrorMessage("Passwords don't match")
    }
    const request = await fetch(`${SERVER_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    })
    const requestParsed = await request.json()
    if (requestParsed) {
      navigate("/login")
    } else {
      alert("Server error")
    }
  }
  return (
    <>
      <Navbar />
      <div className="form-container">
        <h1>Register</h1>
        {errorMessage &&
          <div className="error-box">
            {errorMessage}
          </div>
        }
        <form method="POST" onSubmit={(e) => handleSubmit(e)}>
          <label for="username">
            Username:
          </label><br />
          <small>Required: Length: 3+</small><br />
          <input className="textbox-main" type="text" required id="username" onChange={(e) => setUsername(e.target.value)} /><br />
          <label for="password">
            Password:
          </label><br />
          <input className="textbox-main" type="password" required id="password" onChange={(e) => setPassword(e.target.value)} /><br />
          <label for="checkPassword">
            Confirm your password:
          </label><br />
          <small>Required: Length: 6+</small><br />
          <input className="textbox-main" type="password" required id="checkPassword" onChange={(e) => setCheckPassword(e.target.value)} /><br />
          <button type="submit" className="main-btn">Register</button><br/>
        <Link to="/login">Login instead</Link>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default RegisterView