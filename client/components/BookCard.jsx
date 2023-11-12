import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const BookCard = (book, type) => {
    const handleEdit = () => {

    }
    return (
        <ul>
            <li>Title: {book.title}</li>
            <li>Author: {book.book_author}</li>
            <li>ISBN: {book.isbn}</li>
            <li>Year: {book.year}</li>
            <li>Rate: {book.rate}/5</li>
            <li>Status: {book.readingstatus}</li>
            {(book.readingstatus == "Reading" || book.readingstatus == "Read") && (
                <li>Date began reading: {book.datebegan}</li>
            )}
            {book.readinstatus == "Read" && (
                <li>Date finished reading: {book.dateread} </li>
            )}
            <button onClick={() => handleEdit()}>Edit</button>
        </ul>
    )
}

export default BookCard