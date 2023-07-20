import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./helper";

const initialState = {
    items: [],
    status: null,
}

export const productFetch = createAsyncThunk(
    "products/productsfetch",
    async () => {
       const response = await axios.get(`${BASE_URL}/products`)
       return response?.data
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: {
        [productFetch.pending]: (state, action) => {
            state.status = 'pending'
        },
        [productFetch.fulfilled]: (state, action) => {
            state.status = 'success'
            state.items = action.payload
        },
        [productFetch.rejected]: (state, action) => {
            state.status = 'rejected'
        },
    }

})

export default productsSlice.reducer;