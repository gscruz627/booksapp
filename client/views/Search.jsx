import React, { useState } from 'react'
import NewBookModal from '../components/NewBookModal'

const Search = () => {
  const [query, setQuery] = useState("")
  const [nfound, setNFound] = useState(null)
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setBooks(null)
    const request = await fetch(`https://openlibrary.org/search.json?q=${query}`)
    const requestParsed = await request.json()
    if (!requestParsed) {
      alert("Error when gathering books, please add books manually")
    } else {
      setNFound(requestParsed["numFound"])
      setBooks(requestParsed["docs"])
    }
  }
  return (
    <div>
      <h1>Search</h1>
      <form method='GET' onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder='Search...' onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">GO</button>
      </form>
      { selectedBook && (
        <NewBookModal book={selectedBook} />
      )}
      <div className="results">
        <p>Found: {nfound}</p>
        {books ? (
          books.map((book, i) => (
            <div className="book-item" key={i}>
              <ul>
                <li>Title: {book["title"]}</li>
                <li>Picture: <img id={`${book["isbn"]}sarid`} src={book["isbn"] ? `https://images.isbndb.com/covers/${book["isbn"][0].substring(book["isbn"][0].length - 4, book["isbn"][0].length - 2)}/${book["isbn"][0].substring(book["isbn"][0].length - 2)}/${book["isbn"][0]}.jpg` : '/default.jpg'} width="100" /></li>
                <li>Author: { book["author_name"] ? book["author_name"].length > 1 ? `${book["author_name"][0]} et. al` : book["author_name"][0] : "Not Found"}</li>
                <li>ISBN: {book["isbn"] ? book["isbn"][0] : "Not Found"}</li>
                <li>Year: {book["publish_year"] ? book["publish_year"][0] : "Not Found"}</li>
                <li><button onClick={(e) => {setSelectedBook(book)}}>ADD THIS BOOK</button></li>
              </ul>
            </div>
          )
          )) : <p> loading</p>}
      </div>
    </div>
  )
}

export default Search