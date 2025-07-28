import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//default backend baseUrl
const BACKEND_URL = "http://localhost:8080/api/profile";


//create profile
export const addProfile = createAsyncThunk(
  "profile/created",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/created`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true // if you use cookies/sessions
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create profile");
    }
  }
);

//update profile
export const updateProfile = createAsyncThunk(
  'profile/update',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    console.log('Updating profile with ID:', id);
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axios.put(`${BACKEND_URL}/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
);


export const deleteProfile = createAsyncThunk(
  'profile/delete',
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/delete/${id}`);
      return { id }; // return only the ID so you can remove it from state if needed
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Delete failed');
    }
  }
);


//profile getById
export const getProfile=createAsyncThunk(`profile/get`,async (id:number)=>{
  const response=await axios.get(`${BACKEND_URL}/${id}`)
  return response.data
})


//update profile pic
export const updateProfilePic = createAsyncThunk(
  "profile/updatePic",
  async ({ id, profilePic }: { id: number; profilePic: File }) => {
    const formData = new FormData();
    formData.append("profilePic", profilePic);

     const response=await axios.patch(`${BACKEND_URL}/update-pic/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data
     
  }
);
