import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  dataList: {},
  ncWebOrder: {},
  boltonWebOrder: {},
  partList: [],
  customerList: [],
};

const SalesOrderSlices = createSlice({
  name: "SalesOrderSlice",
  initialState,

  reducers: {
    setPartList: (state, action) => {
      state.partList = action.payload;
    },
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
    dataListSetter: (state, action) => {
      const data = action.payload;
      state.dataList = data ?? {};
    },
    setSalesStateProperty: (state, action) => {
      const { title, value } = action.payload;
      state[title] = value;
    },
    salesOrderDefaultState: () => initialState,
  },
});

export default SalesOrderSlices;

export const {
  dataListSetter,
  setCustomerList,
  setPartList,
  setSalesStateProperty,
  salesOrderDefaultState,
} = SalesOrderSlices.actions;
