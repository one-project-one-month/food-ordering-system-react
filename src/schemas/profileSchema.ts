import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Profile } from "../types/ProfileType";
import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/profile";
export const addProfile = createAsyncThunk("profile/add", async (profile: Omit<Profile, "id">) => {
  const formData = new FormData();

  formData.append("userId", String(profile.userId));
  formData.append("name", profile.name);
  formData.append("nrc", profile.nrc as any);
  formData.append("email", profile.email);
  formData.append("phone", profile.phone);
  formData.append("dob", profile.dob as any);
  formData.append("gender", profile.gender as any);
  formData.append("address", profile.address);
  formData.append("count", String(profile.count));

  // Optional file
  if ((profile as any).profilePic) {
    formData.append("profilePic", (profile as any).profilePic);
    console.log(profile.profilePic)
  }

  const res = await axios.post(`${BACKEND_URL}/created`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
});

