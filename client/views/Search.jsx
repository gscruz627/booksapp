import React, { useState } from 'react'
import NewBookModal from '../components/NewBookModal'
import Navbar from '../components/Navbar'
import SearchBookCard from '../components/SearchBookCard'

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
    <>
      <Navbar></Navbar>
      <div className="searchbox">
        <h1 className="primary">Search</h1>
        <form method='GET' onSubmit={(e) => handleSubmit(e)}>
          <input className="textbox-main" type="text" placeholder='Search...' onChange={(e) => setQuery(e.target.value)} /><br /><br />
          <button type="submit" className='main-btn'>GO</button>
        </form>
        {selectedBook && (
          <NewBookModal book={selectedBook} />
        )}
        <p style={{
          textAlign: 'center',
          margin: 'auto auto',
          color: 'rgb(36, 36, 36)',
          fontSize: '18px',
          margin: '2rem auto'
        }}>Found: {nfound}</p>
        <div className="results">
          {books ? (
            books.map((book, i) => (
              <SearchBookCard book={book} i={i} />
            )
            )) : <p> loading</p>}
        </div>
      </div>
    </>
  )
}

export default Search