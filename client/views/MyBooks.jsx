import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setBooks } from "../store.js"
const MyBooks = () => {
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  const books = useSelector((state) => state.books)
  const dispatch = useDispatch()
  const loadBooks = async () => {
    const request = await fetch(`${SERVER_URL}/books/${user.id}`, {
      headers: {
        "Authentication": token
      }
    })
    const requestParsed = await request.json()
    if (requestParsed) {
      console.log(requestParsed)
      dispatch(setBooks({ books: requestParsed[0]["books"] }))
    } else {
      alert("Request error")
    }
  }
  useEffect(() => {
    loadBooks()
  }, [])
  return (
    <div>
      {books ? books.map((book) => (
        <ul>
          <li>Title: {book.title}</li>
          <li>Author: {book.author}</li>
          <li>ISBN: {book.isbn}</li>
          <li></li>
        </ul>
      )) : <p>loading...</p>}
    </div>
  )
}

export default MyBooks