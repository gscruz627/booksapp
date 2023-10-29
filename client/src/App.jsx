import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)
  const serverurl = import.meta.env["SERVER_URL"]

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LoginPage/> } />
          <Route path="/home" element={ <HomePage/> } />
          <Route path="/profile/:userId" element={ <ProfilePage/> } />
        </Routes>
      </BrowserRouter>
    </div>
}

export default App
