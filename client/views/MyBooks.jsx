import React, { useState, useEffect} from 'react'
import { useSelector } from "react-redux"
import { setBooks } from "../store.js"
const MyBooks = () => {
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
  const token = useSelector( (state) => state.token)
  const user = useSelector( (state) => state.user)
  const loadBooks = async () => {
    const request = await fetch(`${SERVER_URL}/books/${user.id}`, {
      headers: {
        "Authentication" : token
      }
    })
    const requestParsed = await request.json()
    if(requestParsed) {
      setBooks({books: requestParsed})
      const books = useSelector( (state) => state.books)
    } else {
      alert("Request error")
    }
  }
  useEffect( () => {

  })
  return (
    <div>MyBooks</div>
  )
}

export default MyBooks