import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	user: null,
    token: null,
    books: null,
    categories: null,
}

export const commonSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setBooks: (state, action) => {
            state.books = action.payload.books
        },
        setCategories: (state, action) => {
            state.categories = action.payload.categories
        },
        setBook: (state, action) => {
            state.books.map( (book) => {
                if (book.id == action.payload.book.id){
                    return action.payload.book
                } else {
                    return book
                }
            })
        }
}});

export const { setLogin, setLogout, setBooks, setBook, setCategories } = commonSlice.actions;
export default commonSlice.reducer;