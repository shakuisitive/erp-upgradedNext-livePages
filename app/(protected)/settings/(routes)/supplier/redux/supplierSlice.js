import { createSlice } from "@reduxjs/toolkit";

let supplierSlice = createSlice({
  name: "superlierSlice",
  initialState: {
    formIndex:null,
    venEditModal:false,
    venEditDetForm: [],
   newFormModal:false,
   
  },
  reducers: {
    VenEditForm(state, action) {
      state.formIndex = action.payload;
      state.venEditModal = true;
    },
    setNewModal (state, ation){
      state.newFormModal = true
    },
    closeModal(state, action) {
 
      state.newFormModal = false
      state.venEditModal = false;
      state.formIndex = null;
      state.venEditDetForm = [];
    },
    setVenEditDetForm (state,action){
      state.venEditDetForm = action.payload[0]
    }
  },
});

export const {
  closeModal,
  VenEditForm,
  setVenEditDetForm,
  setNewModal
} = supplierSlice.actions;

export default supplierSlice;
