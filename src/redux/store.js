import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import todosReducer from "./slices/todoSlice";
import themeAndLayoutReducer from "./slices/themeAndLayoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    themeAndLayout : themeAndLayoutReducer
  },
});

export default store;
