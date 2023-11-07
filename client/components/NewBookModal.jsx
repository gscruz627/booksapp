import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NewBookModal = ({ book }) => {

    const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
    const [title, setTitle] = useState(book["title"] ? book["title"] : "")
    const [author, setAuthor] = useState(book["author_name"][0] ? book["author_name"][0] : "")
    const [year, setYear] = useState(book["publish_year"][0] ? book["publish_year"][0] : "")
    const [isbn, setIsbn] = useState(book["isbn"][0] ? book["isbn"][0] : "")
    const [currentImageUrl, setCurrentImageUrl] = useState(`https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` ? `https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` : "")
    const [readingStatus, setReadingStatus] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [rate, setRate] = useState("")
    const navigate = useNavigate()
    let categories = []
    const loadCategories = () => {
        categories = useSelector((state) => state.user.categories)
    }
    const handleSubmit = async () => {
        const request = await fetch(`${SERVER_URL}/create`, {
            method: "POST",
            headers: {
                "Authentication": token
            },
            body: JSON.stringify({
                title: title,
                author: author, 
                isbn: isbn, 
                image: currentImageUrl, 
                rate: rate,
                readingstatus: readingStatus,
                dateread: endDate,
                datebegan: startDate
            })
        })
        const requestParsed = await request.json()
        if(requestParsed) {
            navigate("/mybooks")
        } else {
            alert("Request failed")
        }
    }
    useEffect(() => {
        loadCategories
    }, [])

    return (
        <div style={{ border: "1px solid red" }}>
            <h1>Add a new book</h1>
            <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Title: </label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="author">Author: </label>
                <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

                <label htmlFor="year">Year: </label>
                <input id="year" type="text" value={year} onChange={(e) => setYear(e.target.value)} />

                <label htmlFor="category">Category: </label>
                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                    {categories.length > 0 &&
                        (categories.map((category) => (
                            <option value={category}>{category}</option>
                        )))
                    }
                </select>

                <label htmlFor="isbn">ISBN: </label>
                <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />

                <p>Add as:</p>
                <input type="radio" name="readstatus" id="currentlyreading" value="Reading" onChange={(e) => setReadingStatus(e.target.value)} />
                <label htmlFor="currentlyreading" >Currently Reading</label>
                <br></br>
                <input type="radio" name="readstatus" id="alreadyread" value="Read" onChange={(e) => setReadingStatus(e.target.value)} />
                <label htmlFor="alreadyRead" >Already Read</label>
                <br></br>
                <input type="radio" name="readstatus" id="willread" value="Want to Read" onChange={(e) => setReadingStatus(e.target.value)} />
                <label htmlFor="willread" >Want to Read</label>

                <input type="radio" name="rating" id="rate1" value="1" onChange={(e) => setRate(e.target.value)} />
                <label htmlFor="rate0">1</label>
                <br></br>
                <input type="radio" name="rating" id="rate2" value="2" onChange={(e) => setRate(e.target.value)} />
                <label htmlFor="rate1">2</label>
                <br></br>
                <input type="radio" name="rating" id="rate3" value="3" onChange={(e) => setRate(e.target.value)} />
                <label htmlFor="rate3">3</label>
                <br></br>
                <input type="radio" name="rating" id="rate4" value="4" onChange={(e) => setRate(e.target.value)} />
                <label htmlFor="rate4">4</label>
                <br></br>
                <input type="radio" name="rating" id="rate5" value="5" onChange={(e) => setRate(e.target.value)} />
                <label htmlFor="rate5">5</label>

                <p>{startDate} -&gt; {endDate}</p>
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

                <p>Cover: </p>
                <img src={currentImageUrl ? currentImageUrl : "/default.jpg"} width="200" />

                <label htmlFor="changeimageurl">New Image Link: </label>
                <input type="text" value={currentImageUrl} onChange={(e) => setCurrentImageUrl(e.target.value)} />

                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default NewBookModal