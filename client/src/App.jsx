import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import HomeView from "../views/HomeView"
import { Library } from "../views/Library"
import LoginView from "../views/LoginView"
import RegisterView from "../views/RegisterView"
import Search from "../views/Search"
import MyBooks from "../views/MyBooks"

function App() {
  const isAuth = useSelector((state) => state.token)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomeView/> } />
          <Route path="/login" element={ isAuth ? <Navigate to="/" /> : <LoginView /> } />
          <Route path="/register" element={ isAuth ? <Navigate to="/" /> : <RegisterView /> } />
          <Route path="/search" element={ !isAuth ? <Navigate to="/login" /> : <Search /> } />
          <Route path="/mybooks" element={ !isAuth ? <Navigate to="/login" /> : <MyBooks /> } />
          <Route path="/library" element={ !isAuth ? <Navigate to="/login" /> : <Library /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
