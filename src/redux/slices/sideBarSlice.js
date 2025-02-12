import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  edit: false,
  add: false,
  show: false,
  formData: {
    title: "",
    priority: "low",
    deadline: "", // date :- [01-05-2025]
    steps: [],
    reminder: [], // data with time
    repeat: "", // ["daily", "weekly", "monthly"]
  },
  isRightBar: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    onAdd: (state, { payload }) => {
      state.add = true;
      state.isRightBar = true;
    },
    setFormData: (state, { payload }) => {
      state.formData = payload;
    },
    clearFormData: (state) => {
      state.formData = {
        title: "",
        deadline: "", // date :- [01-05-2025]
        steps: [],
        reminder: [], // data with time
        repeat: "", // ["daily", "weekly", "monthly"]
      };
      state.isRightBar = false;
    },
    onEdit: (state, { payload }) => {
      state.edit = true;
      state.isRightBar = true;
      state.data = payload;
    },
    onShow: (state, { payload }) => {
      state.show = true;
      state.isRightBar = true;
      state.data = payload;
    },

    onClose: (state) => {
      state.isRightBar = false;
      state.data = [];
      state.isRightBar = false;
      state.data = [];
      state.edit = false, 
      state.add = false, 
      state.show = false;
    },
  },
});

export default sidebarSlice.reducer;
export const { onAdd, onClose, onEdit, onShow, setFormData, clearFormData } =
  sidebarSlice.actions;
