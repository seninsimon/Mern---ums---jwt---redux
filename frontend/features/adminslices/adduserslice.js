import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const adduserthunk = createAsyncThunk("adduser/adduserthunk", async ({userdata , image}, { RejectWithValue }) => {
    try {


        const formdata = new FormData()
        formdata.append("file",image)
        formdata.append("upload_preset","react-ums")
        

       const cloudinaryresponse = await axios.post("https://api.cloudinary.com/v1_1/dzlubdbjc/image/upload" , formdata)
       console.log("clodinary response :",cloudinaryresponse);

       const imageurl = cloudinaryresponse.data.secure_url


       const userdatas = {...userdata , imageurl}
       




        const response = await axios.post("http://localhost:3000/adduser", {userdatas},
            {
                headers: {
                    Authorization: `bearer ${localStorage.getItem("admintoken")}`
                }
            })

        console.log("response from the server :", response);

        return response.data

    } catch (error) {
        return RejectWithValue(response.error || "error in adding user")
    }
})



const initialState = {
    loading: false,
    success: null,
    error: null,
}




export const adduserslice = createSlice({
    name: "adduser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adduserthunk.pending, (state) => {
                state.loading = true,
                    state.success = null,
                    state.error = null
            })
            .addCase(adduserthunk.fulfilled, (state,action) => {
                state.loading = false,
                    state.success = action.payload,
                    state.error = null
            })
            .addCase(adduserthunk.rejected, (state,action) => {
                state.loading = false,
                    state.success = null,
                    state.error = action.payload
            })
    }
})



export default adduserslice.reducer