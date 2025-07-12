import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/profile";
export const addProfile = createAsyncThunk(`profile/created`, async (formData: FormData) => {
  const response = await axios.post(`${BACKEND_URL}/created`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
});

export const getProfile=createAsyncThunk(`profile/get`,async (id:number)=>{
  const response=await axios.get(`${BACKEND_URL}/${id}`)
  return response.data
})



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
// export const updateProfilePic = createAsyncThunk(
//   "profile/updatePic",
//   async ({ id, profilePic }: { id: number; profilePic: File }) => {
//     const formData = new FormData();
//     formData.append("profilePic", profilePic);

//     await axios.patch(`${BACKEND_URL}/update-pic/${id}`, formData);
//   }
// );