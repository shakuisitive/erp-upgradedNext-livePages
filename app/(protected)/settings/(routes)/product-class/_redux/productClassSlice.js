import { createSlice } from "@reduxjs/toolkit";

const productClassSlice = createSlice({
  name: "productClassSlice",
  initialState: {
    refreshing: false,
    activityDrawer: false,
    formIndex: null,
    inputData: [],
  },
  reducers: {
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },
    setInputData(state, action) {
      state.inputData = action.payload;
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

export default productClassSlice;

export const { setRefreshing, setFormIndex, setInputData, closeDrawer } =
  productClassSlice.actions;
