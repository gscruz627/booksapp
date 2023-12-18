import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setLogout } from '../store'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Profile = () => {
    const SERVER_URL = import.meta.env["VITE_SERVER_URL"];
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const books = useSelector((state) => state.books);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangePassword = async () => {
        let newpassword = prompt("New Password:")
        const request = await fetch(`${SERVER_URL}/changepassword`, {
            method: "PUT",
            headers: {
                "Authentication" : token,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                'id': user.id,
                'newpassword': newpassword
            })
        })
        const requestParsed = await request.json();
        if(requestParsed){
            dispatch(setLogin({user: requestParsed[0]["user"], token: token}));
            alert("Sucessully changed!");
        } else {
            alert("Error on the Server");
        }
    }

    const handleDeleteAccount = async () => {
        const request = await fetch(`${SERVER_URL}/deleteaccount`, {
            method: "DELETE",
            headers: {
                "Authentication": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: user.id
            })
        });
        const requestParsed = await request.json();
        if(requestParsed[1] === 200){
            dispatch(setLogout());
            alert("Sucessfully deleted!, redirecting to home");
            navigate("/");
        } else {
            alert("Error on the server");
        }
    }
    return (
        <>
            <Navbar />
            <div className="profile-card">
                <div className="profile-upper">
                    <div className="avatar">{user.username[0]}</div>
                    <div className="profile-upper-right">
                        <h1>{user.username}</h1><br/>
                        <h4>{books.length} Book Entries</h4>
                    </div>
                </div>
                <div className="profile-lower">
                    <div style={{backgroundColor: "#FFC107"}}>{Array.from(books.filter( (book) => { return book.readingstatus === "Want to Read"})).length} Want To Read</div>
                    <div style={{backgroundColor: "#BA68C8"}}>{Array.from(books.filter( (book) => { return book.readingstatus === "Reading"})).length} Reading</div>
                    <div style={{backgroundColor: "#8BC34A"}}>{Array.from(books.filter( (book) => { return book.readingstatus === "Read"})).length} Already Read</div>
                </div>
                <a style={{textDecoration: "underline", color: "darkgray", cursor: "pointer"}} onClick={() => handleChangePassword()}>Change Password</a> &nbsp;
                <button style={{backgroundColor: "transparent", color: "darkred", cursor: "pointer"}} onClick={() => handleDeleteAccount()}>Delete the Account</button>
            </div>
            <Footer/>
        </>
    )
}

/*
PUBLISH BE, PUBLISH FE, update be new fe link
*/

export default Profile