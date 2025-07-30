import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//default backend baseUrl
const BACKEND_URL = "http://localhost:8080/api/v1/auth/profile";


export const addProfile = createAsyncThunk(
  'profile/add',
  async (
    { id, formData }: { id: number; formData: FormData },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/profile/${String(id)}/create`,
        formData,
        {
          withCredentials: true
          // ❌ Don't set headers manually; Axios will manage Content-Type
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to add profile:', error);

      return thunkAPI.rejectWithValue(
        error.response?.data ?? 'Unknown error occurred'
      );
    }
  }
);



export const updateProfile = createAsyncThunk(
  'profile/update',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    console.log('Updating profile with ID:', id);

    const response = await axios.post(
      `${BACKEND_URL}/${String(id)}/update`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/delete',
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/delete/${String(id)}`);
      return { id }; // return only the ID so you can remove it from state if needed
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data ?? 'Delete failed');
    }
  }
);


export const getProfile = createAsyncThunk(
  'profile/get',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/${String(id)}`);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data ?? 'Failed to fetch profile');
    }
  }
);


export const updateProfilePic = createAsyncThunk(
  "profile/updatePic",
  async ({ id, profilePic }: { id: number; profilePic: File }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", profilePic); // ✅ MUST match backend's field name!

      const response = await axios.post(
        `${BACKEND_URL}/${String(id)}/profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // Should be updated profile object
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to update profile picture"
      );
    }
  }
);
