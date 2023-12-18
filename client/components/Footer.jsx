import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div>
                <a href="https://github.com/gscruz627" style={{ fontSize: "24px"}}><i className="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/gustavo-la-cruz-68abb823b/" style={{ fontSize: "24px"}}><i className="fa-brands fa-linkedin"></i></a>
            </div>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="https://www.gnu.org/licenses/gpl-3.0.html">GNU GPLv3</Link></li>
                    <li><a href="mailto:gscruz627@protonmail.com">Contact</a></li>
                </ul>
            </div>
            <p> <i className="fa-regular fa-copyright"></i> 2023- Gustavo La Cruz | All Rights Reserved</p>
        </footer>
    )
}

export default Footer