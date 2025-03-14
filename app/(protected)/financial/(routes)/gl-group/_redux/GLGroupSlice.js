import { createSlice } from "@reduxjs/toolkit";

const glGroupSlice = createSlice({
  name: "glGroupSlice",
  initialState: {
    refreshing:0,
    activityDrawer:false,
    formIndex:null,
    updateSalePriority: false,
  },
  reducers: {
    setRefreshing(state, action) {
      state.refreshing += 1;
    },
    setFormIndex(state, action) {
      state.formIndex = action.payload;
      state.activityDrawer = true;
    },
    closeDrawer(state,action){
      state.formIndex = null;
      state.activityDrawer = false
    },
    setUpdate(state, action) {
      state.updateSalePriority = action.payload
    },
  },
});

export default glGroupSlice;

export const {
  setRefreshing,
  setFormIndex,
  closeDrawer,
  onDataLoad,
  setPayableReceivable,
  setUpdate,
} = glGroupSlice.actions;
