import React, { useEffect } from 'react'
import NewBookModal from '../components/NewBookModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBooks } from '../store'

const HomeView = () => {
  const isAuth = useSelector((state) => state.token)
  const books = useSelector((state) => state.books)
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
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
    <>
      <Navbar />
      <section className="home-container">
        <div className="sidebar">
          {isAuth ? (
            <>
              <h1>Currently Reading</h1>
              {books && books.map((book) => (
                (book.readingstatus === "Reading") && (
                  <>
                    <img src={book.picture_url} width="100" />
                    <h2>{book.title}</h2>
                    <p>By {book.book_author}</p>
                  </>
                )
              ))}
              <Link to="/library"><button className="main-btn">Go To Library</button></Link>
            </>
          ) : (
            <h3>Create an Account<br /> Or Login <br /> To see Books You are <br /> Currently Reading</h3>
          )}
        </div>
        <div className="home-content">
          <h1> <i className="fa-solid fa-book-open"></i> Books App </h1>
          <p>With Books App you can search for books, and add them to lists of currently reading
            or alraedy read, or want to read. <br/>You can visually see the number of books you have added
            with the Library Tool. <br/>Displaying also a small version of the book's spine which you can also
            edit
          </p>
          { isAuth ? (
            <>
            <Link to="/search"><button className="main-btn">Go to Search</button></Link>
            <p>You have: {books && books.length} total books added</p>
            </>
          ) : (
            <>
            <Link to="/login"><button className="main-btn">Login</button></Link><br/><br/>
            <Link to="/register"><button className="main-btn">Create An Account</button></Link>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default HomeView