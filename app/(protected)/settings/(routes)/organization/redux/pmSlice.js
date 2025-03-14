import { createSlice } from "@reduxjs/toolkit";

const pmSlices = createSlice({
  name: "pmSlice",
  initialState: {
    formIndex: null,
    isModal: false,
    FormData: {
      ACTIVE_FLAG: "Y",
      ALLOW_NEGATIVE_FLAG: "N",
      BARCODE_NUMBER: "",
      BOLTON_FLAG: "N",
      BUYERPARTNUMBER: null,
      CHILD_PART_FLAG: "N",
      CONVERSION_INTO_STOCKING_UOM: 12,
      DEAL_OF_THE_DAY: "N",
      DESCRIPTION: "",
      DISPLAY_ON_HOME_PAGE: "N",
      DUPLICATE_PART_CREATED_FLAG: "N",
      DimensionH: "",
      DimensionL: "",
      DimensionW: "",
      FEATURE_PRODUCT_FLAG: "N",
      INVENTORY: "",
      LAST_COST: null,
      NAME: "",
      NON_STOCK_ITEM_FLAG: "N",
      OH_QUANTITY: null,
      PARGRO_ID: null,
      PAR_CODE: "",
      PAR_ID: null,
      PAR_ID_SUPERCEDES: null,
      PAR_WAR_ID: null,
      PRICE: null,
      QTY_AVAILABLE: null,
      RNUM: 1,
      SKU_MANUFACTURE: "",
      STANDARD_COST: null,
      STOCK_ITEM_FLAG: "N",
      SUPPLIER: "",
      TCL_PART: null,
      TOTALROW: 465,
      TOTAL_AVAILABLE: null,
      TOTAL_ONHAND: null,
      UOM_ID_REORDERING: null,
      UPC_MANUFACTURE: "",
      WAREHOUSE_CODE: "",
      WAREHOUSE_NAME: "",
      WARRANTY: null,
      Weight: "",
    },
    leftFormD:{}
  },
  reducers: {
    openForm(state, action) {
      state.formIndex = action.payload;
      state.isModal = true;
      // console.log("formIndex redux", action.payload);
    },
    openModal(state, action) {
      state.isModal = true;
    },
    closeModal(state, action) {
      state.isModal = false;
    },
    LeftFormData(state,action){
      state.leftFormD = action.payload
      console.log("FormData", action.payload);
    },
   updateFormData(state, action) {
      const updates = action.payload;
      updates.forEach(([fieldName, fieldValue]) => {
        state.FormData[fieldName] = fieldValue;
      });
    },
  },
});

export default pmSlices;

export const { openForm, openModal, closeModal,LeftFormData } =
  pmSlices.actions;
