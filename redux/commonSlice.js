import { createSlice } from "@reduxjs/toolkit";

const commonSlices = createSlice({
  name: "commonSlice",
  initialState: {
    getWarehouse: [],
    getUoW: [],
    getUoM: [],
    getVendor: [],
    getPurchaseG: [],
    getCustomer: [],
    HTData: [],
    groupList: [],
    ProductTypeList: [],
    productClassList: [],
    subGroupList: [],
    brandList: [],
    categoryList: [],
  },
  reducers: {
    Warehouse(state, action) {
      state.getWarehouse = action.payload;
      // console.log("redux warehouse list",action.payload)
    },
    Customer(state, action) {
      state.getCustomer = action.payload;
      // console.log("redux warehouse list",action.payload)
    },
    UoW(state, action) {
      state.getUoW = action.payload;
      // console.log("redux Uow list",action.payload)
    },
    UoM(state, action) {
      state.getUoM = action.payload;
      // console.log("redux UoM list",action.payload)
    },
    Vendor(state, action) {
      state.getVendor = action.payload;
      // console.log("redux Vendor list",action.payload)
    },
    setPurchaseG(state, action) {
      state.getPurchaseG = action.payload;
      // console.log("redux Vendor list",action.payload)
    },
    setHTData(state, action) {
      state.HTData = action.payload;
    },
    setGroupList(state, action) {
      state.groupList = action.payload;
    },
    setProductType(state, action) {
      state.ProductTypeList = action.payload;
    },
    setProductClass(state, action) {
      state.productClassList = action.payload;
    },
    setSubGroup(state, action) {
      state.subGroupList = action.payload;
    },
    setBrandList(state, action) {
      state.brandList = action.payload;
    },
    setCategoryList(state, action) {
      state.categoryList = action.payload;
    },
  },
});

export default commonSlices;

export const {
  Warehouse,
  setBrandList,
  setCategoryList,
  UoW,
  UoM,
  Vendor,
  Customer,
  setPurchaseG,
  setHTData,
  setGroupList,
  setProductType,
  setProductClass,
  setSubGroup,
} = commonSlices.actions;
