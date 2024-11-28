import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const signup = createAsyncThunk("usersignup/signup", async ({userdata,image},{rejectWithValue}) =>
{
    try {

        const imagedata = new FormData()

        imagedata.append("file", image)
        imagedata.append("upload_preset","mern-ums")

        const cloudinaryresponse = await axios.post("https://api.cloudinary.com/v1_1/dzlubdbjc/image/upload", imagedata)  //pass the image data to the cloudinary url 
        console.log("cloudinary response :", cloudinaryresponse);


        const imageurl = cloudinaryresponse.data.secure_url    //this is were the image url is saved
        console.log("image url for profile picture :", imageurl);


        //now the part to send all the signupdata to the serverside

        const signupdata = { ...userdata, imageurl: imageurl }
        console.log("all signup datas :", signupdata);

        const response = await axios.post("http://localhost:3000/signup", signupdata)
        console.log("the data that send to the server and came back with :", response);
        console.log("this is response data from server :", response.data);

        return response.data   // this is the payload for fullfilled case

        

    } catch (error) {

        console.log("error in sending signupdata :", error);
        return rejectWithValue(error.respose?.data || "something went wrong")

    }
})

const initialState = {
    success : null,
    loading : false,
    error : null
}


const  usersignupslice = createSlice({
    name : "usersignup",
    initialState,
    reducers:{},
    extraReducers:(builder)=>
    {
        builder
        .addCase(signup.pending , (state,action)=>
        {
            state.loading = true
        })
        .addCase(signup.fulfilled ,(state,action)=>
        {
            state.loading = false
            state.success = action.payload
        })
        .addCase(signup.rejected , (state,action)=>
        {
            state.loading = false
            state.error = action.payload
        })


    }
})


export default usersignupslice.reducer  //now go to store and add this