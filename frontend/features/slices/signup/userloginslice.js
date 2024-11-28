import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const login = createAsyncThunk("userlogin/login", async (userdata, { rejectWithValue }) => {
    try {

        const response = await axios.post("http://localhost:3000/login", userdata)
        console.log("respose after sending login : ", response);
        console.log("data :", response.data);

        const token = response.data.token
        localStorage.setItem("usertoken", token)


        return response.data // this is the login payload



    } catch (error) {
        return rejectWithValue("login error" || error.response?.data)
    }
})


const initialState = {
    loading: false,
    success: null,
    error: null
}


export const loginslice = createSlice({

    name: 'userlogin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.success = action.payload
                state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }


})




export default loginslice.reducer