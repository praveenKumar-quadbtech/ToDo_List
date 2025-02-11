import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null, 
  isLogged: JSON.parse(localStorage.getItem("isLogged")) ?? false,
  loading: false,
  error: null,
  success : false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, { payload }) => {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the user already exists
      const userExists = users.find(
        (user) => user.email === payload.email
      );
      if (userExists) {
        toast.error("User already registered!");
        return;
      }

      // Add new user to users array
      users.push(payload);
      localStorage.setItem("users", JSON.stringify(users));
      state.success = true;

      // Log in the user automatically after registration
      // state.user = payload.user;
      // state.isLogged = true;
      // localStorage.setItem("currentUser", JSON.stringify(payload.user));
      // localStorage.setItem("isLogged", JSON.stringify(true));

      toast.success("Registration successful!");
    },

    login: (state, { payload }) => {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user exists
      const existingUser = users.find(
        (user) =>
          user.email === payload.email && user.password === payload.password
      );

      if (existingUser) {
        // Set the logged-in user
        state.user = { name: existingUser?.name, email: existingUser?.email };
        state.isLogged = true;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: existingUser?.name,
            email: existingUser?.email,
          })
        );
        localStorage.setItem("isLogged", JSON.stringify(true));

        toast.success("Login successful!");
      } else {
        toast.error("Invalid email or password!");
      }
    },

    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isLogged");

      toast.info("Logged out successfully!");
    },

    clearState: (state) => {
      state.success = false;
    },
  },
});

export const { register, login, logout, clearState } = authSlice.actions;
export default authSlice.reducer;
