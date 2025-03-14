import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState: {
  
    refresh: false,
   
  },
  reducers: {
 
    setRefreshing(state, action) {
      state.refresh = action.payload;
    },
    
    
  },
});

export default sessionSlice;

export const {
  setRefreshing,
} = sessionSlice.actions;
