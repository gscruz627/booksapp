import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	user: null,
    token: null,
    books: null,
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

export const { setLogin, setLogout, setBooks, setBook } = commonSlice.actions;
export default commonSlice.reducer;