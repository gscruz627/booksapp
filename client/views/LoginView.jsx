import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { setLogin } from '../store'

const LoginView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
  const handleSubmit = async (e) => {
    e.preventDefault()
    const request = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({username:username, password:password})
    })
    const requestParsed = await request.json()
    if(requestParsed){
      dispatch( setLogin({user: requestParsed[0]["user"], token: requestParsed[0]["token"]}))
    } else {
      alert("Server error")
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <label for="username">
          Username: 
        </label>
        <input type="text" required id="username" onChange={(e) => setUsername(e.target.value)}/>
        <label for="password">
          Password: 
        </label>
        <input type="password" required id="password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginView