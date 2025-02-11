import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import todosReducer from "./slices/todoSlice";
import sidebarReducer from "./slices/sideBarSlice";
import themeAndLayoutReducer from "./slices/themeAndLayoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    sidebar : sidebarReducer,
    themeAndLayout : themeAndLayoutReducer
  },
});

export default store;
