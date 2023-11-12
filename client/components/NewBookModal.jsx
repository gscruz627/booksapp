import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NewBookModal = ({ book, setAddBook }) => {

    const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
    const token = useSelector((state) => state.token)
    const user = useSelector((state) => state.user)
    const [title, setTitle] = useState(book["title"] ? book["title"] : null)
    const [author, setAuthor] = useState(book["author_name"] ? book["author_name"][0] : null)
    const [year, setYear] = useState(book["publish_year"] ? book["publish_year"][0] : null)
    const [isbn, setIsbn] = useState(book["isbn"] ? book["isbn"][0] : null)
    const [currentImageUrl, setCurrentImageUrl] = useState(book["isbn"] ? `https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` ? `https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` : null : null)
    const [readingStatus, setReadingStatus] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [category, setCategory] = useState(null)
    const [rate, setRate] = useState(null)
    const navigate = useNavigate()
    let categories = []
    const loadCategories = () => {
        categories = useSelector((state) => state.user.categories)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (readingStatus == "") {
            alert("need a reading status")
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
                'id': user.id
            })
        })
        const requestParsed = await request.json()
        if (requestParsed) {
            navigate("/mybooks")
        } else {
            alert("Request failed")
        }
    }
    useEffect(() => {
        loadCategories
    }, [])

    return (
        <section className="newbookmodal">
            <div>
                <h1>Add a new book</h1>
                <span style={{ position: "fixed", color: "rgb(36,36,36)", fontSize: "48px", top: "4rem", right: "11rem", cursor: "pointer" }} onClick={() => setAddBook(false)}>&times;</span>
                <hr />
                <form method="POST" onSubmit={(e) => handleSubmit(e)}>
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
                        {categories.length > 0 &&
                            (categories.map((category) => (
                                <option value={category}>{category}</option>
                            )))
                        }
                    </select>


                    <section>
                        <h2>ADD AS:</h2>

                        <input type="radio" name="readstatus" id="currentlyreading" value="Reading" onChange={(e) => setReadingStatus(e.target.value)} />
                        <label htmlFor="currentlyreading" >Currently Reading</label>
                        <br></br>

                        <input type="radio" name="readstatus" id="alreadyread" value="Read" onChange={(e) => setReadingStatus(e.target.value)} />
                        <label htmlFor="alreadyRead" >Already Read</label>
                        <br></br>

                        <input type="radio" name="readstatus" id="willread" value="Want to Read" onChange={(e) => setReadingStatus(e.target.value)} />
                        <label htmlFor="willread" >Want to Read</label><br />

                        {(readingStatus == "Read" || readingStatus == "Reading") && (
                            <>
                                <label htmlFor="readstart">Start Date: </label>
                                <input type="date" id="readstart" onChange={(e) => setStartDate(e.target.value)} /><br />
                            </>
                        )}
                        {readingStatus == "Read" && (
                            <>
                                <label htmlFor="readend">End Date: </label>
                                <input type='date' id='readend' onChange={(e) => setEndDate(e.target.value)} />
                            </>
                        )}
                    </section>

                    <div className="rate">
                        <h2>Rate {rate && `(${rate})`}</h2>
                        <div id="rating_bar">
                            <span id="rate_1" onClick={() => setRate(1)}></span>
                            <span id="rate_2" onClick={() => setRate(2)}></span>
                            <span id="rate_3" onClick={() => setRate(3)}></span>
                            <span id="rate_4" onClick={() => setRate(4)}></span>
                            <span id="rate_5" onClick={() => setRate(5)}></span>
                        </div>
                    </div>

                    <div className="add-image">
                        <h2>Cover</h2>
                        <img src={currentImageUrl ? currentImageUrl : "/default.jpg"} width="200" /><br/>

                        <label htmlFor="changeimageurl">New Image Link: </label>
                        <input className="textbox-main" type="text" value={currentImageUrl} onBlur={(e) => setCurrentImageUrl(e.target.value)} />
                    </div>
                    <button type="submit" className="main-btn" style={{textAlign: "center", gridColumnStart: "1", gridColumnEnd: "3"}}>Create</button>
                </form>
            </div>
        </section>
    )
}

export default NewBookModal