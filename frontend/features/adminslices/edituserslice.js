import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const edituserthunk = createAsyncThunk("edituser/edituserthunk", async ({updateddata,id}, { rejectWithvalue }) => {
    try {

        const response = await axios.put(`http://localhost:3000/edituser/${id}`,updateddata,  // this will always go the req.body
            {
                headers :{
                    Authorization : `bearer ${localStorage.getItem("admintoken")}`
                }
            }
        )
        console.log("server response : ", response)

        return response.data

    } catch (error) {

        return rejectWithvalue(response.error || "error in updating user")
    }
})


const initialState = {
    loading: false,
    success: null,
    error: null
}


export const edituserslice = createSlice({
    name: "edituser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(edituserthunk.pending, (state, action) => {
                state.loading = true,
                    state.success = null,
                    state.error = null
            })
            .addCase(edituserthunk.pending, (state, action) => {
                state.loading = false,
                    state.success = action.payload
                state.error = null
            })
            .addCase(edituserthunk.pending, (state, action) => {
                state.loading = false,
                    state.success = null,
                    state.error = action.payload
            })

    }

})




export default edituserslice.reducer