import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../store'

const Navbar = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div>
            <nav className="primary-nav">
                <ul>
                    <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}><i class="fa-solid fa-book-open"></i> BooksApp</h1>
                </ul>
            </nav >
            <nav className="secondary-nav">
                <ul>
                    <li onClick={() => navigate("/")}>Home</li>
                    {user ? (
                        <>
                            <li onClick={() => navigate("/library")}>Library</li>
                            <li onClick={() => navigate("/search")}>Search</li>
                            <li>Profile ({user.username})</li>
                            <li onClick={() => dispatch(setLogout())}>Log Out</li>
                        </>
                    ) : (
                        <>
                            <li onClick={() => navigate("/login")}>Login</li>
                            <li onClick={() => navigate("/register")}>Create An Account</li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar