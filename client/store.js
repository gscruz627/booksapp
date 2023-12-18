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
            state.books = null;
            state.categories = null;
        },
        setBooks: (state, action) => {
            state.books = action.payload.books
        },
        setCategories: (state, action) => {
            state.categories = action.payload.categories
        },
        setBook: (state, action) => {
            state.books = state.books.map((book) =>
              book.id === action.payload.book.id ? action.payload.book : book
            );
        },
        setCategory: (state, action) => {
            state.categories = state.categories.map( (category) => 
                category.id === action.payload.category.id ? action.payload.category : category
            );
        }
}});

export const { setLogin, setLogout, setBooks, setBook, setCategories, setCategory } = commonSlice.actions;
export default commonSlice.reducer;