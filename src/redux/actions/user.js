import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://task-manager-3745.onrender.com";

// Thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/register`,
        userDetails
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    console.log("login action");
    console.log(credentials);
    
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
