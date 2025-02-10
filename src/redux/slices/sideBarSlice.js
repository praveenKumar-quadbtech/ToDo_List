import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    data : [],
    isOpen : false,
}

const sidebarSlice = createSlice({
    name : "sidebar",
    initialState,
    reducers : {
       onOpen : (state, {payload})=>{
             state.isOpen = true;
             state.data = payload;
       },
       onClose : (state)=>{
        state.isOpen = false;
        state.data = [];
       }
    }
})

export default sidebarSlice.reducer
export const {onClose , onOpen} = sidebarSlice.actions