import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const adminloginthunk = createAsyncThunk("adminlogin/adminloginthunk", async (admindata, { rejectWithValue }) => {
    try {

        const response = await axios.post("http://localhost:3000/adminlogin", admindata)
        console.log("response from the server : ", response);

        const token = response.data.admintoken
        localStorage.setItem("admintoken",token)


        return response.data // this is the fulfilled payload


    } catch (error) {
        return rejectWithValue(error.response || "some error happend in admin login")
    }

}
)


const initialState = {
    loading: false,
    success: null,
    error: null
}

export const adminloginslice = createSlice({
    name: "adminlogin",
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
        bulider
            .addCase(adminloginthunk.pending, (state, action) => {
                state.loading = true
                state.success = false
                state.error = false
            })
            .addCase(adminloginthunk.fulfilled, (state, action) => {
                state.success = action.payload  // the payload is the returned response.data from the loginthunnk
                state.loading = false
                state.error = false
            })
            .addCase(adminloginthunk.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })
    }
})



export default adminloginslice.reducer