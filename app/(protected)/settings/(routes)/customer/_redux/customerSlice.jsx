import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    formIndex: null,
    isModal: false,
    editDetForm: [],
    refresh: false,
    province: {},
    purchaseGroup: {},
    warehouse: {},
    discount: {},
  },
  reducers: {
    EditForm(state, action) {
      state.formIndex = action.payload;
      state.isModal = true;
    },
    NewModal(state, action) {
      state.isModal = true;
    },
    closeModal(state, action) {
      state.isModal = false;
      state.formIndex = null;
      state.editDetForm = [];
    },
    setRefresh(state, action) {
      state.refresh = true;
    },
    setEditDetForm(state, action) {
      state.editDetForm = action?.payload[0];
    },
    setProvince(state, action) {
      state.province = action.payload;
    },
    setPurchaseG(state, action) {
      state.purchaseGroup = action.payload;
    },
    setDiscountG(state, action) {
      state.discount = action.payload;
    },
    setWarehouse(state, action) {
      state.warehouse = action.payload;
    },
  },
});

export default customerSlice;

export const {
  EditForm,
  NewModal,
  closeModal,
  setRefresh,
  setEditDetForm,
  setDiscountG,
  setPurchaseG,
  setWarehouse,
  setProvince,
} = customerSlice.actions;
