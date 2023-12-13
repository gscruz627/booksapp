import React, { useEffect, useState, forceR } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import { setBook, setBooks, setCategories } from '../store';
import { setCategory as reduxSetCategory } from "../store";
import NewBookModal from '../components/NewBookModal';


export const Library = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const SERVER_URL = import.meta.env["VITE_SERVER_URL"]
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  const books = useSelector((state) => state.books)
  let categories = useSelector((state) => state.categories)
  const dispatch = useDispatch()
  const [category, setCategory] = useState("All");
  const [categoryIndex, setCategoryIndex] = useState(null)
  const [currentBook, setCurrentBook] = useState(null)
  const [currentMatrix, setCurrentMatrix] = useState(Array.from({ length: category == "All" ? 3 : category["rows"] }, () => Array(category == "All" ? 12 : category["columns"]).fill(null)))
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [year, setYear] = useState(null)
  const [isbn, setIsbn] = useState(null)
  const [currentImageUrl, setCurrentImageUrl] = useState(null)
  const [readingStatus, setReadingStatus] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [rate, setRate] = useState(null)
  const [changeCategory, setChangeCategory] = useState(null)
  const [bgColor, setBgColor] = useState(null)
  const [txtColor, setTxtColor] = useState(null)


  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook["title"])
      setAuthor(currentBook["book_author"])
      setYear(currentBook["year"])
      setIsbn(currentBook["isbn"])
      setCurrentImageUrl(currentBook["picture_url"])
      setReadingStatus(currentBook["readingstatus"])
      setStartDate(currentBook["datebegan"])
      setEndDate(currentBook["dateread"])
      setRate(currentBook["rate"])
      setChangeCategory(currentBook["category"])
      setBgColor(currentBook["spinecolor"])
      setTxtColor(currentBook["spinetext"])
    }
  }, [currentBook])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (readingStatus == "") {
      alert("need a reading status")
      return
    }
    const request = await fetch(`${SERVER_URL}/editbook/${currentBook["id"]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": token
      },
      body: JSON.stringify({
        'info': {
          'title': title,
          'book_author': author,
          'isbn': isbn,
          'picture_url': currentImageUrl,
          'rate': rate,
          'year': year,
          'category': category["id"],
          'textcategory': category["name"],
          'readingstatus': readingStatus,
          'dateread': endDate,
          'datebegan': startDate,
          "spinecolor": bgColor,
          "spinetext": txtColor,
        },
        "userId": user.id
      })
    })
    const requestParsed = await request.json()
    if (requestParsed) {
      dispatch(setBook({ book: requestParsed[0]["book"] }))
      alert("Book saved successfully!")
    } else {
      alert("Request failed")
    }
  }
  const handleAddCategory = async () => {
    const newname = prompt("Name the new category: ")
    if (!newname) { return }
    const request = await fetch(`${SERVER_URL}/newcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": token
      },
      body: JSON.stringify({ name: newname, user_id: user.id })
    })
    const requestParsed = await request.json();
    if (requestParsed) {
      dispatch(setCategories({ categories: requestParsed[0]["categories"] }))
    } else {
      alert("Error on server")
    }
  }
  const getBooks = async () => {
    const request = await fetch(
      category == "All" ? `${SERVER_URL}/books/${user.id}` : `${SERVER_URL}/books/${user.id}?category=${encodeURIComponent(category)}`, {
      headers: {
        "Authentication": token
      }
    })
    const requestParsed = await request.json()
    if (requestParsed) {
      dispatch(setBooks({ books: requestParsed[0]["books"] }))
    } else {
      alert("Error on server")
    }
  }
  const loadCategories = async () => {
    const request = await fetch(`${SERVER_URL}/categories/${user.id}`, {
      headers: {
        "Authentication": token
      }
    })
    const requestParsed = await request.json()
    if (requestParsed) {
      dispatch(setCategories({ categories: requestParsed[0]["categories"] }))
    } else {
      alert("Error on server")
    }
  }
  const handleDeleteBook = async () => {
    const request = await fetch(`${SERVER_URL}/deletebook/${currentBook["id"]}`, {
      method: "DELETE",
      headers: {
        "Authentication": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category: (category === "All") ? null : category,
        userId: user.id
      })
    })
    const requestParsed = await request.json()
    setCurrentBook(null)
    dispatch(setBooks({ books: requestParsed[0]["books"] }))
  }
  const handleEditCategory = async () => {
    const newname = prompt("New Category Name: ")
    if (newname) {
      const request = await fetch(`${SERVER_URL}/editcategory/${categories[categoryIndex]["id"]}`, {
        method: "POST",
        headers: {
          "Authentication": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          newname: newname
        })
      })
      const requestParsed = await request.json()
      if (requestParsed) {
        console.log(requestParsed)
        dispatch(reduxSetCategory({ category: requestParsed[0]["category"] }))
        setCategory(requestParsed[0]["category"]["name"])
        forceUpdate()
      } else {
        alert("Error on the server")
      }
    }
    return
  }
  const handleDeleteCategory = async () => {
    const request = await fetch(`${SERVER_URL}/deletecategory/${categories[categoryIndex]["id"]}`, {
      method: "DELETE",
      headers: {
        "Authentication": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.id
      })
    })
    const requestParsed = await request.json()
    if (requestParsed) {
      dispatch(setCategories({ categories: requestParsed[0]["categories"] }))
      setCategoryIndex(null)
      setCategory("All")
      setCurrentBook(null)
    } else {
      alert("Error on the server")
    }
  }
  useEffect(() => {
    loadCategories()
  }, [])
  useEffect(() => {
    getBooks()
  }, [category])
  useEffect(() => {
    //console.log(currentMatrix)
  }, [currentMatrix])
  useEffect(() => {
    loadNewMatrix();
  }, [books])
  const loadNewMatrix = async () => {
    // Determine rows:
    let numrows = Math.ceil(books.length / 12)
    if (books.length === 0) { numrows = 1 }
    setCurrentMatrix(Array.from({ length: (category == "All") ? 3 : numrows }, () => Array(12).fill(null)))

    // Fix general index issue (Don't Touch it works!)
    let genIdx = 0
    if (category === "All") {
      genIdx = -36;
    } else {
      genIdx = 0 - (numrows * 12)
    }
    const initialMatrix = Array.from({ length: (category == "All") ? 3 : numrows }, () => Array(12).fill(null))

    //---------------------
    const dontdeletethisoneforsomereasonifyoutakethisoneoutitdontworknomore = initialMatrix.map((row) =>
      row.map((col) => {
        const value = books[genIdx] ? books[genIdx] : "";
        genIdx += 1;
        return value;
      })
    );
    //----------------------

    const a = initialMatrix.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        const value = books[genIdx]
        genIdx += 1
        return value ?? ""
      }))
    setCurrentMatrix(a)
  }
  return (
    <>
      <Navbar />
      <h2 style={{ margin: "2rem auto", textAlign: "center" }}>
        <i onClick={() => {
          if (category === "All") {
            setCategoryIndex(categories.length - 1)
            setCategory(categories[categories.length - 1]["name"])
          }
          else if (categoryIndex === 0) {
            setCategory("All")
          } else {
            setCategoryIndex(categoryIndex - 1)
            setCategory(categories[categoryIndex - 1]["name"])
          }
          setCurrentBook(null)
        }} style={{
          color: "steelblue", cursor: "pointer"
        }} className="fa-solid fa-arrow-left" ></i>&nbsp;&nbsp;
        {category} &nbsp;
        {
          (category !== "All") &&
          <>
            <i class="fa-solid fa-pencil" onClick={() => handleEditCategory()} style={{ color: "orange", cursor: "pointer" }}></i>&nbsp;
            <i class="fa-solid fa-trash" onClick={() => handleDeleteCategory()} style={{ color: 'darkred', cursor: "pointer" }}></i> &nbsp;
          </>
        }
        <i class="fa-solid fa-plus" onClick={() => handleAddCategory()} style={{ color: 'darkgreen', cursor: "pointer" }}></i>
        &nbsp;&nbsp;
        <i onClick={() => {
          if (category === "All") {
            setCategoryIndex(0)
            setCategory(categories[0]["name"])
          }
          else if (categoryIndex === categories.length - 1) {
            setCategory("All")
          } else {
            setCategoryIndex(categoryIndex + 1)
            setCategory(categories[categoryIndex + 1]["name"])
          }
          setCurrentBook(null)
        }} className="fa-solid fa-arrow-right" style={{ color: "steelblue", cursor: "pointer" }}></i>
      </h2 >
      <section className="library-home">
        <div className="library-container">
          {currentMatrix &&
            <div className="bookshelf" style={{ width: "408px" }}>
              {[...Array((category == "All") ? 3 : currentMatrix.length)].map((e, row) => (
                <article className="bookshelf-row" style={{ height: "150px", width: "366px", gridTemplateColumns: `${"auto ".repeat(12)}` }}>
                  {[...Array(12)].map((e, col) => (
                    (currentMatrix[row] && currentMatrix[row][col]) ? (
                      <div className="book" style={{ color: `${currentMatrix[row][col]["spinetext"]}`, backgroundColor: `${currentMatrix[row][col]["spinecolor"]}` }} onClick={() => setCurrentBook(currentMatrix[row][col])}>
                        <p>{currentMatrix[row][col]["title"].length > 12 ? `${currentMatrix[row][col]["title"].substring(0, 10)}...` : currentMatrix[row][col]["title"]}</p>
                        <div className="triangle" style={{ display: (currentMatrix[row][col]["readingstatus"] === "Want to Read") ? "block" : "none" }}></div>
                        <div className="book-hover-info">
                          <img src={currentMatrix[row][col]["picture_url"]} width="100"></img>
                          <p>{currentMatrix[row][col]["title"]}</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: "30px" }}></div>
                    )
                  ))}
                </article>
              ))}
            </div>}
        </div>
        <div className="library-card">
          { (currentBook && title) ? (
            <div className='newbook-inner inner-edit'>
              <section>
                <h1></h1>
                <h1><i class="fa-solid fa-pencil"></i>&nbsp; Edit book </h1>
                <h1 style={{ fontSize: "48px", marginBottom: "8px", cursor: "pointer" }} onClick={() => setAddBook(false)}>&times;</h1>
              </section>
              <hr />
              <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-dual">
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
                      (categories.map((category, i) => (
                        <option key={i} value={category["name"]}>{category["name"]}</option>
                      )))
                    }
                  </select>
                </div>
                <h2>ADD AS:</h2>
                <section className="form-read-status">

                  <button type="button" style={{ backgroundColor: (readingStatus == "Want to Read") ? "#FFF" : "rgb(116,170,251)", color: (readingStatus !== "Want to Read") ? "#FFF" : "rgb(116,170,251)", border: (readingStatus == "Want to Read") ? "1px solid rgb(116,170,251)" : "1px solid #FFF" }} className="main-btn" onClick={() => setReadingStatus("Want to Read")}>Want to Read</button>
                  <button type="button" style={{ backgroundColor: (readingStatus == "Reading") ? "#FFF" : "rgb(116,170,251)", color: (readingStatus !== "Reading") ? "#FFF" : "rgb(116,170,251)", border: (readingStatus == "Reading") ? "1px solid rgb(116,170,251)" : "1px solid #FFF" }} className="main-btn" onClick={() => setReadingStatus("Reading")}>Reading</button>
                  <button type="button" style={{ backgroundColor: (readingStatus == "Read") ? "#FFF" : "rgb(116,170,251)", color: (readingStatus !== "Read") ? "#FFF" : "rgb(116,170,251)", border: (readingStatus == "Read") ? "1px solid rgb(116,170,251)" : "1px solid #FFF" }} className="main-btn" onClick={() => setReadingStatus("Read")}>Read</button>

                </section>

                <section className="form-date">

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
                </section>



                <div className="lower-panel">

                  <div className="lower-p-left">
                    <img src={currentImageUrl ? currentImageUrl : "/default.jpg"} width="200" />
                    <div className="book" style={{ border: "6px solid #1E1A18", height: "100%", color: txtColor, backgroundColor: bgColor }}>
                      <p style={{marginRight:"-0.2rem"}}>{title.length > 20 ? `${title.substring(0, 20)}...` : title}</p>
                    </div>
                  </div>

                  <div className="lower-p-right">
                    <div className="rate">
                      <h2 style={{ marginBottom: "-1rem" }}>Rate {rate && `(${rate})`}</h2>
                      <div id="rating_bar">
                        <span id="rate_1" onClick={() => setRate(1)}></span>
                        <span id="rate_2" onClick={() => setRate(2)}></span>
                        <span id="rate_3" onClick={() => setRate(3)}></span>
                        <span id="rate_4" onClick={() => setRate(4)}></span>
                        <span id="rate_5" onClick={() => setRate(5)}></span>
                      </div>
                    </div>
                    <h2><label htmlFor="changeimageurl">Image Link: </label></h2>
                    <input className="textbox-main" type="text" defaultValue={currentImageUrl} onBlur={(e) => setCurrentImageUrl(e.target.value)} />
                    <h2>Colors</h2>
                    <input id="bgColor" type="color" value={`${bgColor}`} onChange={(e) => setBgColor(e.target.value)} />
                    <input id="txtColor" type="color" value={`${txtColor}`} onChange={(e) => setTxtColor(e.target.value)} /><br /><br />
                    <button type="submit" className="main-btn" style={{ textAlign: "center" }}>Create</button>
                  </div>
                </div>
              </form>
            </div>) : <p>Select a Book to see its contents</p>}
        </div>
      </section >
    </>
  )
}

/* NOW DO:
- LOGIN, REGISTER, DEAL WITH
- ADD FOOTER
- RWD
- Eliminate add rows, cols, and also in db
- DONE
*/