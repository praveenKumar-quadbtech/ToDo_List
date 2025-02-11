import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isDark: JSON.parse(localStorage.getItem("isDark")) ?? false,
  isGrid: JSON.parse(localStorage.getItem("isGrid")) ?? false,
};

const themeAndLayoutSlice = createSlice({
    name : "themeAndLayout",
    initialState,
    reducers : {
        toggleTheme : (state)=>{
                const newTheme = !state.isDark;
                state.isDark = newTheme;
                localStorage.setItem("isDark", JSON.stringify(newTheme));
        },
        toggleLayout : (state)=>{
            const newLayout = !state.isGrid;
                state.isGrid = newLayout;
                localStorage.setItem("isGrid", JSON.stringify(newLayout));
        }
    }
})

export default themeAndLayoutSlice.reducer
export const {toggleLayout, toggleTheme} = themeAndLayoutSlice.actions