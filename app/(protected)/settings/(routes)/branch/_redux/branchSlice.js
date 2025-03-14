import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branchSlice",
  initialState: {
  formIndex:null,
    locEditModal:false,
    locEditDetForm: [],
   organization:[],
   warehouse:[],
   newFormModal:false,
  },
  reducers: {
 
    setOrganization(state, action) {
      state.organization = action.payload;
    },
    setWarehouse(state, action) {
      state.warehouse = action.payload;
    },
    
     LocEditForm(state, action) {
      state.formIndex = action.payload;
      state.locEditModal = true;
    },
    setNewModal (state, ation){
      state.newFormModal = true
    },
    closeModal(state, action) {
      state.newFormModal = false
      state.locEditModal = false;
      state.formIndex = null;
      state.locEditDetForm = [];
    },
    setLocEditDetForm (state,action){
      state.locEditDetForm = action.payload[0]
    }
  },
});

export default branchSlice;

export const {
  setOrganization,
  closeModal,
  setLocEditDetForm,
  LocEditForm,setWarehouse,
  setNewModal
} = branchSlice.actions;
