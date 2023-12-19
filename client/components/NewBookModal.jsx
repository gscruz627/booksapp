import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategories } from '../store'

const NewBookModal = ({ book, setAddBook }) => {

    const SERVER_URL = import.meta.env["VITE_SERVER_URL"];
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState(book["title"] ? book["title"] : null);
    const [author, setAuthor] = useState(book["author_name"] ? book["author_name"][0] : null);
    const [year, setYear] = useState(book["publish_year"] ? book["publish_year"][0] : null);
    const [isbn, setIsbn] = useState(book["isbn"] ? book["isbn"][0] : null);
    const [currentImageUrl, setCurrentImageUrl] = useState(book["isbn"] ? `https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` ? `https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` : null : null);
    const [readingStatus, setReadingStatus] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [category, setCategory] = useState(null);
    const [rate, setRate] = useState(null);
    const [bgColor, setBgColor] = useState("#FFFFFF");
    const [txtColor, setTxtColor] = useState("#000000");

    const loadCategories = async () => {
        const request = await fetch(`${SERVER_URL}/categories/${user.id}`, {
            headers: {
                "Authentication": token
            }
        })
        const requestParsed = await request.json();
        if (requestParsed) {
            dispatch(setCategories({ categories: requestParsed[0]["categories"] }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (readingStatus === "") {
            alert("Need a Reading Status");
            return
        }
        const request = await fetch(`${SERVER_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authentication": token
            },
            body: JSON.stringify({
                'title': title,
                'author': author,
                'isbn': isbn,
                'image': currentImageUrl,
                'rate': rate,
                'year': year,
                'category': category,
                'readingstatus': readingStatus,
                'dateread': endDate,
                'datebegan': startDate,
                'id': user.id,
                "spinecolor": bgColor,
                "spinetext": txtColor
            })
        })
        const requestParsed = await request.json();
        if (requestParsed) {
            navigate("/library");
        } else {
            alert("Request failed");
            return
        }
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <section className="newbookmodal">
            <div className='newbook-inner'>
                <section>
                    <h1></h1>
                    <h1><i class="fa-solid fa-square-plus"></i>&nbsp; Add a new book</h1>
                    <h1 style={{ fontSize: "48px", marginBottom: "8px", cursor: "pointer" }} onClick={() => setAddBook(false)}>&times;</h1>
                </section>
                <hr />
                <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-dual">
                        <label htmlFor="title">Title: </label>
                        <input id="title" className="textbox-main" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                        <label htmlFor="author">Author: </label>
                        <input id="author" className="textbox-main" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

                        <label htmlFor="year">Year: </label>
                        <input id="year" className="textbox-main" type="text" value={year} onChange={(e) => setYear(e.target.value)} />

                        <label htmlFor="isbn">ISBN: </label>
                        <input type="text" className="textbox-main" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />

                        <label htmlFor="category">Category: </label>
                        <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                            { (categories && categories.length > 0) &&
                                (categories.map((category, i) => (
                                    <option key={i} value={category["name"]}>{category["name"]}</option>
                                )))
                            }
                        </select>
                    </div>
                    <h2>ADD AS:</h2>
                    <section className="form-read-status">

                        <button type="button" style={{ backgroundColor: (readingStatus == "Want to Read") ? "#FFF" : "rgb(116,170,251)", color: (readingStatus !== "Want to Read") ? "#FFF" : "rgb(116,170,251)", border: (readingStatus == "Want to Read") ? "1px solid rgb(116,170,251)" : "1px solid #FFF" }} className="main-btn" onClick={() => setReadingStatus("Want to Read")}>Want to Read</button>
                        <button type="button" style={{ backgroundColor: (readingStatus == "Reading") ? "#FFF" : "rgb(116,170,251)", color: (readingStatus !== "Reading") ? "#FFF" : "rgb(116,170,251)", border: (readingStatus == "Reading") ? "1px solid rgb(116,170,251)" : "1px solid #FFF" }} className="main-btn" onClick={() => setReadingStatus("Reading")}>Reading</button>
                        <button type="button" style={{ backgroundColor: (readingStatus == "Read") ? "#FFF" : "rgb(116,170,251)", color: (readingStatus !== "Read") ? "#FFF" : "rgb(116,170,251)", border: (readingStatus == "Read") ? "1px solid rgb(116,170,251)" : "1px solid #FFF" }} className="main-btn" onClick={() => setReadingStatus("Read")}>Read</button>

                    </section>

                    <section className="form-date">

                        {(readingStatus == "Read" || readingStatus == "Reading") && (
                            <>
                                <label htmlFor="readstart">Start Date: </label>
                                <input type="date" id="readstart" onChange={(e) => setStartDate(e.target.value)} />
                            </>
                        )}
                        {readingStatus == "Read" && (
                            <>
                                <label htmlFor="readend">End Date: </label>
                                <input type='date' id='readend' onChange={(e) => setEndDate(e.target.value)} />
                            </>
                        )}
                    </section>

                    <div className="lower-panel">

                        <div className="lower-p-left">
                            <img src={currentImageUrl ? currentImageUrl : "/default.jpg"} width="200" />
                            <div className="book" style={{ border: "6px solid #1E1A18", height: "100%", color: txtColor, backgroundColor: bgColor, width: "30px" }}>
                                <p>{ (title &&title.length > 20) ? `${title.substring(0, 20)}...` : title}</p>
                            </div>
                        </div>

                        <div className="lower-p-right">
                            <div className="rate">
                                <h2 style={{ marginBottom: "-1rem" }}>Rate {rate && `(${rate})`}</h2>
                                <div id="rating_bar">
                                    <span id="rate_1" onClick={() => setRate(1)}></span>
                                    <span id="rate_2" onClick={() => setRate(2)}></span>
                                    <span id="rate_3" onClick={() => setRate(3)}></span>
                                    <span id="rate_4" onClick={() => setRate(4)}></span>
                                    <span id="rate_5" onClick={() => setRate(5)}></span>
                                </div>
                            </div>
                            <h2><label htmlFor="changeimageurl">Image Link: </label></h2>
                            <input className="textbox-main" type="text" defaultValue={currentImageUrl} onBlur={(e) => setCurrentImageUrl(e.target.value)} />
                            <h2>Colors</h2>
                            <input id="bgColor" type="color" value={`${bgColor}`} onChange={(e) => setBgColor(e.target.value)} />
                            <input id="txtColor" type="color" value={`${txtColor}`} onChange={(e) => setTxtColor(e.target.value)} /><br /><br />
                            <button type="submit" className="main-btn" style={{ textAlign: "center" }}>Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default NewBookModal