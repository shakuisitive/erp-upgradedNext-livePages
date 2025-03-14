// slices/dataSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

//base url
let url = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL;
// let token=localStorage.getItem('tokenSession');

//update discountGroup data

export const updateDiscountGroup = createAsyncThunk(
  "discountGroup/update",
  async (data) => {
    let token = "";
    useEffect(() => {
      token =
        typeof window !== "undefined"
          ? localStorage.getItem("tokenSession")
          : null;
    }, []);
    try {
      let newdata = {
        data: data,
        action: "Administration",
        method: "PostDiscountGroup",
        username: "testuser",
        type: "rpc",
        tid: "144",
      };
      const response = await fetch(url + "Administration/PostDiscountGroup", {
        method: "POST",
        body: JSON.stringify(newdata),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) { console.log(error)}
  }
);

export const validateCode = createAsyncThunk(
  "validateCode/get",
  async (data) => {
    try {
      const response = await fetch(
        url + "InventoryWeb/GetCodeUniqueValidation",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.json();
    } catch (error) {console.log(error)}
  }
);

const DiscountGroupSlice = createSlice({
  name: "data",
  initialState: {
    // Define your initial state
    data: [],
    formData: [],
    formIndex: [],
    prevFormData: [],
    loading: false,
    error: null,
    code: "",
    closeModall: false,
    drawerFormData: [],
    refresh: false,
    activityDrawer: false,

    refArray: [],
    nextFocus: null,
    refreshing: false,
  },
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
      state.prevFormData.push(action.payload);
      if (state.prevFormData.length > 10) {
        state.prevFormData.shift();
      }
    },
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },
    setFormIndex(state, action) {
      state.formIndex = action.payload;
      state.activityDrawer = true;
    },
    updateforRefresh(state, action) {
      state.refresh = action.payload;
    },
    setValidCode(state, action) {
      state.code.push(action.payload);
      if (state.code.length > 30) {
        state.code.shift();
      }
    },
    setcloseModall(state, action) {
      state.closeModall = action.payload;
    },
    openForm(state, action) {
      state.drawerFormData = action.payload;
    },
    addRef(state, action) {
      state.refArray.push(action.payload);
    },
    setNextIndex(state, action) {
      state.nextFocus = action.payload;
    },
    closeDrawer(state, action) {
      state.formIndex = null;
      state.activityDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDiscountGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDiscountGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateDiscountGroup.rejected, (state) => {
        state.loading = false;
      }) //validateCode fn sate
      .addCase(validateCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateCode.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload;
      })
      .addCase(validateCode.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  openForm,
  setFormData,
  updateforRefresh,
  closeDrawer,
  setValidCode,
  setRefreshing,
  setcloseModall,
  addRef,
  setFormIndex,
  setNextIndex,
} = DiscountGroupSlice.actions;
export default DiscountGroupSlice;
