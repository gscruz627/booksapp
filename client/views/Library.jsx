import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import { setCategories } from '../store';


export const Library = () => {
  const SERVER_URL = import.meta.env["SERVER_URL"]
  let rows = 3;
  let columns = 15;
  let books = ['fundamentals', 'mainframe', 'infame', 'dog']
  const token = useSelector( (state) => state.token)
  const user = useSelector(  (state) => state.user)
  let categories = useSelector( (state) => state.categories)
  const dispatch = useDispatch()
  const [category, setCategory] = useState("all");
  const handleAddCategory = async () => {
    newname = prompt("Name the new category: ")
    const request = await fetch(`${SERVER_URL}/newcategory`, {
      headers: {
        "Content-Type" : "application/json",
        "Authentication" : token
      },
      body: JSON.stringify({name: newname, user_id: user.id})
    })
    const requestParsed = await request.json();
    if(requestParsed){
      dispatch(setCategories({categories: requestParsed[0]["categories"]}))
    }
  }
  // HANDLE ADD CATEGORY: ADD CATEGORY IN DB,
  // CATEGORIES RELATIONSHIP WITH BOOKS
  // SHOW ALL CATEGORIES
  // DISPLAY BOOKS FROM THAT CATEGORIES, REPLACE TO BOOKS
  // EACH CATEGORY HAS TITLE, ROWS, COLS
  // ADD BOOK SIDECOVER COLOR IN CREATE BOOK, WHITE DEFAULT
  // TOOLTIP WHEN HOVER
  // REPLACE ROWS AND COLUMNS
  // TOOLTIP SHOWS COVER IMAGE AND FULL TITLE
  // FOR NOW, WORRY ABOUT TOP, OTHERWISE: WORK ON RIGHT SIDE
  // DISPLAY FULL INFO, INSIDE OF TEXTBOXES READY TO EDIT
  // IF CHANGE IS DETECTED (SOMEHOW) READY TO MAKE CHANGES
  // AND MAKE REQUEST TO EDIT
  // LOGIN, REGISTER, RESPONSIVE, FOOTER, DONE ._.

  return (
    <>
      <Navbar />
      <h2 style={{ margin: "2rem auto", textAlign:"center" }}>{category}  &nbsp;<span onClick={() => handleAddCategory()} style={{color:'darkgreen', cursor:"pointer"}}>[ADD]</span></h2>
      <div style={{fontSize: "24px", textAlign: "center"}}>
        <h4 style={{display: "inline"}}>Columns</h4>
        <span> + </span>
        <span> - </span>
        <br/><br/>
        <h4 style={{display: "inline"}}>Rows</h4>
        <span> + </span>
        <span> - </span>
        <br/><br/>
      </div>
      <section className="library-home">
        <div className="library-container">
          <div className="bookshelf" style={{ width: `${(columns * 30) + 48}px` }}>
            {[...Array(rows)].map((e, i) => (
              <article className="bookshelf-row" style={{ height: "150px", width: `${columns * 30 + 6}px`, gridTemplateColumns: `${"auto ".repeat(columns)}` }}>
                {[...Array(columns)].map((e, i) => (
                  books[i] ? (
                    <div className="book">
                      <p>{books[i]}</p>
                    </div>
                  ) : (
                    <div style={{ width: "36px" }}></div>
                  )
                ))}

              </article>
            ))}
          </div>
        </div>
        <div className="library-card">
          <p>This is library card for each title</p>
        </div>
      </section>
    </>
  )
}
