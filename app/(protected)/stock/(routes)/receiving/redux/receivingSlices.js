import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const receivingSlices = createSlice({
  name: "receivingSlice",
  initialState: {
    // functions: [],
    // pageState: 0,
    subGridState: [],
    receivingDetails: {},
    formIndex: null,
    FormStatus: null,
    postReceiving: [],
    postReceivingDetail: [],
    wareHouse: [],
    postFinalize: {},
    receivingOrderList: [],
    postSales: [],
    postRByPO: {},
    Refresh: false,
    closeModal: false,
    openModallForm: false,
    isDrawr: false,
    colaps: true,
    mGSubDataDet: [],
    mGPRData: [],
    mGDetils: [],
    warId: {},
    mGWarId: {},
    mGSubGridData: [],
    subGridCellTData: null,
    isCheckedFItem :[],
    inputValues: {
      note: '',
      ref: '',
      date: ''
    },
  },
  reducers: {
    openForm(state, action) {
      state.formIndex = action.payload;
      state.openModallForm = true;
    },

    setIsCheckedFItem(state, action) {
      state.isCheckedFItem.push(action.payload);

    },

    removeSameIndex: (state, action) => {
      state.isCheckedFItem = state.isCheckedFItem.filter(item => item !== action.payload);
    },

    setWarId: (state, action) => {
      state.warId = action.payload;
    },

    setMGSubGridData: (state, action) => {
      state.mGSubGridData = action.payload;
    },

    setMGWarId: (state, action) => {
      state.mGWarId = action.payload;
    },

    setCloseModal: (state) => {
      state.openModallForm = false;
    },
    setWareHouse(state, action) {
      state.wareHouse = action.payload;
    },
    setReceivingOrderList(state, action) {
      state.receivingOrderList = action.payload;
    },
    subGridset(state, action) {
      state.subGridState = action.payload;
    },
    setReceivingDetails(state, action) {
      state.receivingDetails = action.payload;
      state.FormStatus = action.payload.RECEIVING_STATUS;
    },

    updateQty: (state, action) => {
      const { id, value } = action.payload;
      const itemToUpdate = state.postReceivingDetail.find(
        (item) => item.INVRECDET_ID === id
      );
      if (itemToUpdate) {
        itemToUpdate.QUANTITY = Number(value);
      }
    },
    setRefresh(state, action) {
      state.Refresh = action.payload;
    },
    // // for Modal Close
    setcloseModal(state, payload) {
      state.closeModal = action.payload;
      state.postReceiving = [];
    },

    setSave(state, action) {
      return produce(state, (draftState) => {
        draftState.postReceivingDetail.forEach((item) => {
          item.BACK_ORDER_FLAG = "Y";
        });

        draftState.postReceiving[0].RELEASED_FLAG = "Y";
        draftState.postRByPO = {
          INVREC_ID: state.postReceivingDetail[0].INVREC_ID,
          PURORD_ID: state.postReceiving[0].PURORD_ID,
          USE_ID: state.postReceivingDetail[0].USE_ID,
        };
      });
    },
    // for restock status
    setRestock(state, action) {
      return produce(state, (draftState) => {
        // this is working code
        const newArr = state.postReceivingDetail.map((obj) => {
          // console.log("redux obj ",obj)

          return { ...obj, READY_FOR_RESTOCK_FLAG: "Y" };
        });

        draftState.postReceivingDetail = newArr;
        draftState.postFinalize = {
          INVREC_ID: state.postReceivingDetail[0].INVREC_ID,
          USE_ID: state.postReceivingDetail[0].USE_ID,
        };
        draftState.postSales = [
          {
            INVREC_ID: state.postReceivingDetail[0].INVREC_ID,
            USE_ID: state.postReceivingDetail[0].USE_ID,
            WAR_ID: state.postReceivingDetail[0].WAR_ID,
          },
        ];
      });
    },

    // for input form data
    setUpdatedReceving(state, action) {
      const newArr2 = action.payload.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      state.postReceiving = newArr2;
    },

    

    // Grid Data
    setUpdatedReceivingDetail(state, action) {
      const newArr2 = action.payload.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      state.postReceivingDetail = newArr2;
    },

    closeModallForm(state, action) {
      state.openModallForm = false;
    },
    openDrawr(state, action) {
      state.isDrawr = action.payload;
    },

    setColapsRedux(state, action) {
      state.colaps = action.payload;
    },
    setMGdetails(state, action) {
      state.mGDetils = action.payload;
    },
    setMGSubDataDet(state, action) {
      const filteredData = action.payload.map((item) => ({
        INVRECDET_ID: item.INVRECDET_ID,
        INVREC_ID: state.mGDetils.INVREC_ID,
        PAR_ID: item.PAR_ID,
        DESCRIPTION: item.DESCRIPTION,
        QUANTITY: item.QUANTITY,
        DELETED_FLAG: "N",
        COST: item.COST,
        WORORD_ID: null,
        CONVERT_QTY: item.QTY_CONVERSION,
        USE_ID: "2694",
        INVPARLOT_ID: item.INVPARLOT_ID,
        PURORDDET_ID: null,
        SHELF: item.SHELF,
        RACK: null,
        BIN: null,
        QUARANTINE_FLAG: item.QUARANTINE_FLAG,
        WAR_ID: item.WAR_ID,
        READY_FOR_RESTOCK_FLAG: item.READY_FOR_RESTOCK_FLAG,
        BACK_ORDER_FLAG: item.BACK_ORDER_FLAG,
        QTY_ORDERED: item.QTY_ORDERED,
        BO_QUANTITY: item.BO_QUANTITY,
      }));
      state.mGSubDataDet = filteredData;
    },

    setMGPRData(state, action) {
      const filteredData = action.payload.map((item) => ({
        FINAL_DATE: item.FINAL_DATE || "",
        FINZ_USE_ID: "2694",
        INVREC_ID: item.INVREC_ID,
        PREPARED_DATE: item.PREPARED_DATE || "",
        PURORD_ID: item.PURORD_ID,
        RECEIVING_DATE: item.REC_DATE,
        RECEIVING_NUMBER: item.RECEIVING_NUMBER,
        RELEASED_FLAG: item.RELEASED_FLAG == "N" ? "Y" : item.RELEASED_FLAG,
        SUPPLIER_INVOICE_NUMBER: "",
        SUP_INVOICE_DATE: item.SUPPLIER_INVOICE_DATE | "",
        SUP_INVOICE_DUE_DATE: item.SUPPLIER_INVOICE_DUE_DATE || "",
        TERMS_CONDITION: item.TERMS_CONDITION || "",
        USE_ID_PREPARED_BY: "2694",
        USE_ID_RELEASED_BY: "2694",
        VEN_ID: item.VEN_ID,
        VOID_FLAG: "N",
        FINZ_FLAG: "N",
        VOID_NOTES: item.VOID_NOTES || "",
        WAR_ID: item.WAR_ID,
        SHELF: item.SHELF || "A",
        RACK: "B",
        BIN: "C",
        REFERENCE_NUMBER: item.RECIEVING_REFERENCE_NUMBER,
        NOTES: item?.RECIEVING_NOTES || "",
      }));
      state.mGPRData = filteredData;
    },
    updateMSGQty: (state, action) => {
      const { id, value } = action.payload;
      const itemToUpdate = state.mGSubDataDet.find(
        (item) => item.INVRECDET_ID === id
      );
      if (itemToUpdate) {
        itemToUpdate.QUANTITY = Number(value);
      }
    },
    clearMGSubGridData: (state) => {
      state.mGSubGridData = [];
      state.receivingOrderList = [];
      state.postReceivingDetail=[];
      state.postReceiving=[]
    },
       
    setSubGridCellTData : (state, action) => {
      state.subGridCellTData = action.payload
    },
    setNote: (state, action) => {
      state.inputValues.note = action.payload;
      state.postReceiving[0].NOTES = action.payload;
    },
    setRefNo: (state, action) => {
      state.inputValues.ref = action.payload;
      state.postReceiving[0].REFERENCE_NUMBER = action.payload;
    },
    setRefDate: (state, action) => {
      state.inputValues.date = action.payload;
      state.postReceiving[0].SUP_INVOICE_DATE = action.payload;
    },

  },
});

export default receivingSlices;

export const {
  openForm,
  subGridset,
  setReceivingDetails,
  setUpdatedReceving,
  setUpdatedReceivingDetail,
  updateRefNumber,
  updateNotes,
  setcloseModal,
  setRefresh,
  setRestock,
  setCloseModal,
  setSave,
  closeModallForm,
  openDrawr,
  setColapsRedux,
  updateQty,
  setReceivingOrderList,
  setWareHouse,
  setWarId,
  setMGPRData,
  setMGSubDataDet,
  setMGdetails,
  updateMSGQty,
  setMGWarId,
  setMGSubGridData,
  clearMGSubGridData,
  setSubGridCellTData,
  setIsCheckedFItem,
  removeSameIndex,
  setNote,
  setRefNo,
  setRefDate
} = receivingSlices.actions;
