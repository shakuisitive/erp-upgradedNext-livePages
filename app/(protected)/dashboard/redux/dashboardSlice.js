import { createSlice } from "@reduxjs/toolkit";


const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    dashboardPurgroTotal: [],
    purchaseList:[],
    saleList:[],
    saleReturn:[],
  },
  reducers: {
    setDashboardPurgroTotal : (state,action)=>{
        state.dashboardPurgroTotal = action.payload
       
    },
    setPurchaseList : (state,action)=>{
        state.purchaseList = action.payload
       
    },
    setSalesList : (state,action)=>{
        state.saleList = action.payload
       
    },
    setSalesReturnList : (state,action)=>{
        state.saleReturn = action.payload
       
    },
  },
});

export default dashboardSlice;

export const {setDashboardPurgroTotal,setPurchaseList,setSalesList,setSalesReturnList} =
  dashboardSlice.actions;
