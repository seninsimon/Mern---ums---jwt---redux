import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'




export const adminpanelthunk = createAsyncThunk("adminpanel/adminpanelthunk", async (_, { rejectWithValue }) => {
    try {

        const response = await axios.get("http://localhost:3000/adminpanel",
             {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
                },
             }
        )
        console.log("response from the server : ", response);


        return response.data.users  // this is the fullfilled payload


    } catch (error) {
        return rejectWithValue(error.response || "error in adminpanel to fetch data")
    }
})

const initialState = {
    loading: false,
    success: [],
    error: null
}


export const adminpanelslice = createSlice({
    name: "adminpanel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminpanelthunk.pending, (state) => {
                state.loading = true
                state.success = []
                state.error = false
            })
            .addCase(adminpanelthunk.fulfilled, (state, action) =>
            {
                state.loading = false,
                state.success = action.payload,
                state.error = false;
            }
            )
            .addCase(adminpanelthunk.rejected , (state ,action)=>
            {
                state.error = action.payload
                state.loading = false
                state.success = []  
            })
    }
})



export default adminpanelslice.reducer