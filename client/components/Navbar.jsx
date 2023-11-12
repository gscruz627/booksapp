import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../store'

const Navbar = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <nav>
            <ul>
                <h1 className="primary">BooksApp</h1>
            </ul>
            <ul>
                {user && (
                    <li>
                        <button className="alt-btn" onClick={() => navigate("/mybooks")}>My Collection</button>
                    </li>
                )}
                <li>
                    {user ? (
                        <button className="alt-btn">{user.username}</button>
                    ) : (
                        <button className="main-btn">Log In</button>
                    )}
                </li>
                <li>
                    {user ? (
                        <button className="main-btn" onClick={() => dispatch(setLogout())}>Log Out</button>
                    ) : (
                        <button className="main-btn">Register</button>
                    )}
                </li>
            </ul>
        </nav >
    )
}

export default Navbar