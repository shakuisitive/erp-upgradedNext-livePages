import { createSlice } from "@reduxjs/toolkit";

const promotionSlice = createSlice({
  name: "promotionSlice",
  initialState: {
  formIndex:null,
    promoEditModal:false,
    promoEditDetForm: [],
    newFormModal: false,
   customer:[],
   partList:[],
   partLotList:[],
   purchaseGroup:[],
   promoEditDetFormLot:[]
  },
  reducers: {
 
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    setPartList(state, action) {
      state.partList = action.payload;
    },
    setPartLotList(state, action) {
      state.partLotList = action.payload;
    },
    setPurchaseGroup(state, action) {
      state.purchaseGroup = action.payload;
    },
    
     PromoEditForm(state, action) {
      state.formIndex = action.payload;
      state.promoEditModal = true;
    },
    setNewPromoModal (state, ation){
      state.newFormModal = true
    },
    closeModal(state, action) {
      state.newFormModal = false
      state.promoEditModal = false;
      state.formIndex = null;
      state.promoEditDetForm = [];
      state.promoEditDetFormLot = [];
    },
    setPromoEditDetForm (state,action){
      state.promoEditDetForm = action.payload[0]
    },
    setPromoEditDetFormLot (state,action){
      state.promoEditDetFormLot = action.payload
    },
  },
});

export default promotionSlice;

export const {
  setCustomer,
  setPartList,
  setPurchaseGroup,
  closeModal,
  setPromoEditDetForm,
  PromoEditForm,
  setPromoEditDetFormLot,
  setPartLotList,
    setNewPromoModal


} = promotionSlice.actions;
