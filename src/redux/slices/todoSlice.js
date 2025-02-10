import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../actions/task";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isFetching: false,
    isAdding: false,
    isDeleting: false,
    isUpdating: false,
    error: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload?.yourTasks;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })

      // Add todo
      .addCase(addTodo.pending, (state) => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isAdding = false;
        state.error = null;
        state.success = true;

        const newTaks = action.payload.newTaks;
        state.items = [...state.items , newTaks]
        toast.success("Task is Added!");
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload?.message || "Error while adding task.";
        toast.error("Error while adding task.");
      })

      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;

        const removedTask = action.payload.removedTask;
        state.items = state.items.filter(task =>
          task._id !== removedTask._id 
        );

        toast.success(
          action.payload?.message || "Task is Deleted Successfully!"
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload?.message || "Error while deleting task.";
        toast.error("Error while deleting task.");
      })

      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        state.success = true;

         const updatedTask = action.payload.updatedTask; 
         state.items = state.items.map((task) =>
           task._id === updatedTask._id ? updatedTask : task
         );

        toast.success( "Task is Updated!");
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload?.message || "Error while updating task.";
        toast.error("Error while updating task.");
      });
  },
});

export default todoSlice.reducer;
