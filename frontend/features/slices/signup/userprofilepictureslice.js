import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for changing profile picture
export const changeprofilepic = createAsyncThunk('dpchange/changeprofilepic',async ({ image, token }, { rejectWithValue }) => {
    try {
      const formdata = new FormData();
      formdata.append('file', image);
      formdata.append('upload_preset', 'mern-ums');

      const cloudinaryresponse = await axios.post('https://api.cloudinary.com/v1_1/dzlubdbjc/image/upload', formdata);
      console.log("cloudinary response :",cloudinaryresponse)

      const imageurl = cloudinaryresponse.data.secure_url;
      console.log("imagr url :",imageurl)

   
      const response = await axios.put('http://localhost:3000/profile',{ imageurl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("response from server : ",response)

      return response.data.userdata.imageurl; // Return updated image URL
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error updating profile');
    }
  }
);

const initialState = {
  loading: false,
  success: null,
  error: null,
};

export const profilepictureslice = createSlice({
  name: 'dbchange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeprofilepic.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeprofilepic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(changeprofilepic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profilepictureslice.reducer;
