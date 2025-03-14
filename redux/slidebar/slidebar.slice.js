import React from "react";

import { createSlice } from "@reduxjs/toolkit";

const CheckOutSlices = createSlice({
  name: "CheckOutSlice",
  initialState: {
    functions: [],
    mouseEvntState: true,
    stockPage: [
      "Product Master",
      "Purchase",
      "Receiving",
      "Stock Order",
      "Physical-count",
      "Cycle-count",
      "Transfer",
    ],
    // stockPage: ['Product Master', 'Purchase', 'Receiving', 'Stock Order', 'Phisycal Count', "Cycle Count", "Transfer"],
    stocklistState: true,
    salesPage: [""],
    salesPage: ["Sales Order", "Pick Order"],
    // salesPage: ["Sales Order", "Pick Order", "Sales Return"],
    saleslistState: true,
    // AdministrationPage: [
    // ],
    AdministrationPage: [
      "Customer",
      // "Payment Term",
      "Supplier",
      "Organization",
      "Tax",
      "Forex",
      "Channel",
      "Warehouse",
      "Discount Group",
      "Purchase Group",
      
      // "Sub Group",
      // "Lot Number",
      // "UOW",
      "Sessions",
      "Shipping Box",
      "Branch",
      "Brand",
      "UOM",
      "Promotion",
      "Product Category",
      "HT Code",
      "Product Type",
      "Product Class",
      "Product Groups",
      // "Variance",
      "Shipping Carrier",
      "Shipping Config",
    ],
    AdministrationlistState: true,
    securitylistState: true,
    SecurityPage: [""],
    FinancialPage:[
      "GL Account",
      "Chart Of Account",
       "Period",
       "GL Group"
      ],
    FinancialListState: true,
    // SecurityPage:["Roles And Permissions"],
    slectedSection: {},
  },
  reducers: {
    checkOutfirstFunction(state, action) {},

    mouseEvnt(state, action) {
      state.mouseEvntState = action.payload;
    },

    stockPageEvnt(state, action) {
      state.stocklistState = action.payload;
    },
    salesPageEvnt(state, action) {
      state.saleslistState = action.payload;
    },

    AdministrationPageEvnt(state, action) {
      state.AdministrationlistState = action.payload;
    },
    SecurityPageEvnt(state, action) {
      state.securitylistState = action.payload;
    },
    FinancialPageEvent(state,action){
      state.FinancialListState = action.payload;
    },

    PageClickedCheck(state, action) {
      state.slectedSection = action.payload;
    },
  },
});

export default CheckOutSlices;

export const {
  checkOutfirstFunction,
  mouseEvnt,
  stockPageEvnt,
  salesPageEvnt,
  AdministrationPageEvnt,
  SecurityPageEvnt,
  FinancialPageEvent,
  PageClickedCheck,
} = CheckOutSlices.actions;
