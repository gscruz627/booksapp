import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogin } from "../store.js"

const RegisterView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(username.length <= 3){
      alert("username length")
      return
    }
    if(username == password){
      alert("user can't be password")
      return
    }
    if(password.length <= 6){
      alert("Password length has to be 6+")
      return
    }
    if(password != checkPassword){
      alert("Passwords don't match")
    }
    const request = await fetch(`${SERVER_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({username:username, password:password})
    })
    const requestParsed = await request.json()
    if(requestParsed){
      navigate("/login")
    } else {
      alert("Server error")
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <label for="username">
          Username: 
        </label>
        <input type="text" required id="username" onChange={(e) => setUsername(e.target.value)}/>
        <label for="password">
          Password: 
        </label>
        <input type="password" required id="password" onChange={(e) => setPassword(e.target.value)}/>
        <label for="checkPassword">
          Confirm your password: 
        </label>
        <input type="password" required id="checkPassword" onChange={(e) => setCheckPassword(e.target.value)}/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterView