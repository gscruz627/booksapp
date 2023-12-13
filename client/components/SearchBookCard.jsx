import React, { useState } from 'react'
import NewBookModal from './NewBookModal'

const SearchBookCard = ({ book, i }) => {
    const [addBook, setAddBook] = useState(false)
    return (
        <div className="resultbook">
            {addBook && (
                <NewBookModal book={book} setAddBook={setAddBook} />
            )}
            <img src={book["isbn"] ? `https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` : '/default.jpg'} alt="This book" />
            <section>
                <h2 title={book["title"]}>{book["title"].length > 15 ? `${book["title"].substring(0, 15)}...` : book["title"]}</h2>
                <p>by {book["author_name"] ? book["author_name"][0].length > 30 ? `${book["author_name"][0].substring(0, 30)}...` : book["author_name"][0] : "Unknown Author"}</p>
                <p>From {book["publish_year"] ? book["publish_year"][0] : "Unknown Publish Year"}</p>
                <button className="main-btn" onClick={(e) => setAddBook(true)}>ADD THIS BOOK</button>
            </section>
        </div>
    )
}

export default SearchBookCard