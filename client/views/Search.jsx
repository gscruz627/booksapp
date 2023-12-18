import React, { useState } from 'react'
import NewBookModal from '../components/NewBookModal'
import Navbar from '../components/Navbar'
import SearchBookCard from '../components/SearchBookCard'
import Footer from '../components/Footer'

const Search = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooks(null);
    const request = await fetch(`https://openlibrary.org/search.json?q=${query}`)
    const requestParsed = await request.json();
    if (!requestParsed) {
      alert("Error when gathering books, please add books manually")
    } else {
      setBooks(requestParsed["docs"]);
    }
  }
  return (
    <>
      <Navbar />
      <div className="searchbox">
        <h1>Search</h1>
        <form method='GET' onSubmit={(e) => handleSubmit(e)}>
          <input className="textbox-main" type="text" placeholder='Search...' onChange={(e) => setQuery(e.target.value)} /><br /><br />
          <button type="submit" className='main-btn'>GO</button>
        </form>
        </div>
        {selectedBook && (
          <NewBookModal book={selectedBook} />
        )}
        <p style={{
          textAlign: 'center',
          margin: 'auto auto',
          color: 'rgb(36, 36, 36)',
          fontSize: '18px',
          margin: '2rem auto'
        }}>Found: {books && books.length}</p>
        <div className="results">
          {books ? (
            books.map((book, i) => (
              <SearchBookCard book={book} i={i} />
            )
            )) : <p> Loading...</p>}
        </div>
        <Footer/>
    </>
  )
}

export default Search