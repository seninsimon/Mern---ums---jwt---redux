import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const deleteuserthunk = createAsyncThunk("deleteuser/deleteuserthunk", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:3000/deleteuser/${id}`,
            {
                headers : {
                    Authorization : `bearer ${localStorage.getItem("admintoken")}`
                }
            }
        )
        console.log("deleted user :", response)

        localStorage.removeItem("usertoken")

        return response.data.deleteduser



    } catch (error) {
        return rejectWithValue(error.response || "error happend in deleting user")
    }
})



const initialState = {
    loading: false,
    error: null,
    deleteduser: null
}


export const deletuserslice = createSlice({
    name: "deleteuser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteuserthunk.pending, (state) => {
                state.loading = true
                state.deleteduser = null,
                    state.error = null
            })
            .addCase(deleteuserthunk.fulfilled, (state,action) => {
                state.loading = false
                state.deleteduser = action.payload,
                    state.error = null
            })
            .addCase(deleteuserthunk.rejected, (state,action) => {
                state.loading = false
                state.deleteduser = null,
                    state.error = action.payload
            })
    }
})




export default deletuserslice.reducer