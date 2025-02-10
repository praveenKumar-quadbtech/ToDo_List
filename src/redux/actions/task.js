import {createAsyncThunk} from "@reduxjs/toolkit"

import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";


const API_URL = "https://task-manager-3745.onrender.com";

// Thunks for CRUD operations
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async ({ token, navigate }, { rejectWithValue , dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
         dispatch(logout())
        toast.error("Invalid Token , Please Login Again!")
        navigate("/login");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ token, todo }, { rejectWithValue , dispatch}) => {
    console.log({ token, todo });
    try {
      const response = await axios.post(`${API_URL}/todos`, todo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // dispatch(fetchTodos(token)); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async ({ token, id }, { rejectWithValue , dispatch}) => {
    try {
     const res = await axios.delete(`${API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // dispatch(fetchTodos(token)); 
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ token, id, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch(
        `${API_URL}/todos/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // dispatch(fetchTodos(token));
      console.log("data from update action" , res.data)  
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

