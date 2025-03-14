import { createSlice } from "@reduxjs/toolkit";

const purchaseGSlice = createSlice({
  name: "purchaseGSlice",
  initialState: {
    refreshing: false,
    activityDrawer: false,
    formIndex: null,
  },
  reducers: {
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },

    setFormIndex(state, action) {
      state.formIndex = action.payload;
      state.activityDrawer = true;
    },
    closeDrawer(state, action) {
      state.formIndex = null;
      state.activityDrawer = false;
    },
  },
});

export default purchaseGSlice;

export const { setRefreshing, setFormIndex, setInputData, closeDrawer } =
  purchaseGSlice.actions;
