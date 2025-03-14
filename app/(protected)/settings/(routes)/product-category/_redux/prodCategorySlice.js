import { createSlice } from "@reduxjs/toolkit";

const prodCategorySlice = createSlice({
  name: "prodCategorySlice",
  initialState: {
    refreshing:false,
    activityDrawer:false,
    formIndex:null,
    editFormModal: false,
    newFormModal: false,
    ProdCatagoryFormData: [],
    
  },
  reducers: {
 
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },
    setFormIndex(state, action) {
      state.formIndex = action.payload;
      state.activityDrawer = true;
    },
    closeDrawer(state,action){
      state.formIndex = null;
      state.activityDrawer = false
    },
    setNewModal(state, ation) {
      state.newFormModal = true;
    },
    // setFormIndex(state, action) {
    //   state.formIndex = action.payload;
    //   state.editFormModal = true;
    // },
    closeEditModal(state, action) {
      state.formIndex = null;
      state.editFormModal = false;
      state.newFormModal = false;
      state.ProdCatagoryFormData = [];
    },
    setProdCatagoryFormData(state, action) {
      state.ProdCatagoryFormData = action.payload[0];
    },
  },
});

export default prodCategorySlice;

export const {
  setRefreshing,
  setFormIndex,
  closeDrawer,setNewModal, closeEditModal,setProdCatagoryFormData,
} = prodCategorySlice.actions;
