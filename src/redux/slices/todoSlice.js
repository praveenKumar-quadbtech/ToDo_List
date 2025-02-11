import { createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loadTasksFromStorage = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState = {
  tasks: loadTasksFromStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Create Task
    addTask: (state, { payload }) => {
      const currentDate = new Date().toISOString().split("T")[0];
      state.tasks.push({
        id: nanoid(),
        ...payload,
        progress: "pending", // "pending" ,"inprogress", "completed"
        priority: "low", // "low", "medium" , "high"
        createdAt: Date.now(),
        deadline: currentDate,
      });
      saveTasksToStorage(state.tasks);
      toast.success("Task added successfully!");
    },

    // Update Task
    updateTask: (state, { payload }) => {
      console.log(payload);
      
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          return {...task, ...payload.data}
        }
        return task
      });
      saveTasksToStorage(state.tasks);
      toast.success("Task updated successfully!");
    },

    // Delete Task
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
      saveTasksToStorage(state.tasks);
      toast.info("Task deleted!");
    },

    getTasks: (state) => {
      state.tasks = loadTasksFromStorage();
    },
  },
});

export const { addTask, updateTask, deleteTask, getTasks } = taskSlice.actions;
export default taskSlice.reducer;
