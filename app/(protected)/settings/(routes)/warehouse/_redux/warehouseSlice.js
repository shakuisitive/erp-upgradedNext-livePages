import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
let warehouseSlice = createSlice({
  name: "warehouseSlice",
  initialState: {
    formIndex:null,
    warehouseMainList: [],
    warEditModal:false,
   newFormModal:false,

    warEditDetForm: [],
    locationList:[],
    fcLocList:[],
    fcLocListPar:[],
    priority:[],
   branch:[],
   updateSalePriority:false
  },
  reducers: {
    WarEditForm(state, action) {
      state.formIndex = action.payload;
      state.warEditModal = true;
    },
    setNewModal (state, ation){
      state.newFormModal = true
    },
    closeModal(state, action) {
       state.newFormModal = false
      state.warEditModal = false;
      state.formIndex = null;
      state.warEditDetForm = [];
      state.locationList=[]
    },
    setWarEditDetForm (state,action){
      state.warEditDetForm = action.payload[0]
    },
    setWarehouseMainList (state,action) {
      state.warehouseMainList = action.payload
    },
    setPriority(state, action) {
       const { id, value } = action.payload;
      const index = state.warehouseMainList.findIndex(data => data.WAR_ID === id);
  if (index !== -1) {
    return {
      ...state,
      warehouseMainList: [
        ...state.warehouseMainList.slice(0, index), 
        {
          ...state.warehouseMainList[index], 
          SALES_PRIORITY: value 
        },
        ...state.warehouseMainList.slice(index + 1) 
      ]
    };
  }
  return state;
    },
    setBranch (state , action){
        state.branch = action.payload
    },
    setLocationList (state,action){
      state.locationList =action.payload
    },
    setFcLocList (state , action){
      state.fcLocList = action.payload
    },
    setFcLocListPar (state,action){
      state.fcLocListPar = action.payload
    },
    setFcLocMin (state,action){
      const { ind, min } = action.payload;
  state.fcLocListPar[ind] = {...state.fcLocListPar[ind], MIN_QTY: min };
    },
    setFcLocMax (state,action){
      const { ind, max } = action.payload;
  state.fcLocListPar[ind] = {...state.fcLocListPar[ind], MAX_QTY: max };
    },
    setFcLocReorder (state,action){
      const { ind, reorder } = action.payload;
  state.fcLocListPar[ind] = {...state.fcLocListPar[ind], REORDER_QUANTITY: reorder };
    },
  setUpdateSP (state, action){
    state.updateSalePriority = action.payload
  },
  },
});

export const {
  closeModal,
  WarEditForm,
  setWarEditDetForm,
  setWarehouseMainList,
  setBranch,
  setNewModal,
  setLocationList,
  setFcLocReorder,
  setPriority,
  setFcLocList,
  setFcLocMax,

  setFcLocMin,
  setUpdateSP,
  setFcLocListPar,
} = warehouseSlice.actions;

export default warehouseSlice;
