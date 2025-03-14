import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const pmSlices = createSlice({
  name: "pmSlice",
  initialState: {
    mainLoader: true,
    formIndex: null,
    kitFormIndex: null,
    isKitModal: false,
    isModal: false,
    landCost: null,
    listPrice: null,
    costDrawer: true,
    reportDrawer: false,
    editDetForm: null,
    kitSubGrid: [],
    editKitForm: null,
    editKitDetForm: [],
    editKitCust: [],
    refresh: false,
    editFormVariance: [],
    partList: [],
    addKitItem: [],
    selectedKitWAR_ID: null,
    KitOH_Qty: null,
    ImagesData: [],
    KitImagesData: [],
    kitQty: 0,
    getUpsale: [],
    avlQty: 0,
    isNewkitOpen: false,
    postKitRes: "",
    qtyUsed: null,
    partNameOverride: [],
    warehouse: [],
    purchaseGroup: [],
    brand: [],
    prodCat: [],
    custPartPayload: [],
    custPartCode: null,
    duplicateLotData: [],
    duplicateDrawer: false,
    sectionToData: [],
    locationOptions: [],
    rowOptions: [],
    binOptions: [],
    isCheckedFItem: [],
  },
  reducers: {
    setGetUpsale (state, action) {
    state.getUpsale = action.payload
    },
    EditForm(state, action) {
      state.formIndex = action.payload;
      state.isModal = true;
    },
    KitEditForm(state, action) {
      state.kitFormIndex = action.payload;
      state.isKitModal = true;
    },
    NewModal(state, action) {
      state.isModal = true;
      state.ImagesData = [];
    },
    setReportDrawer(state, action) {
      state.reportDrawer = action.payload;
    },
    setNewKitOpen(state, action) {
      state.isNewkitOpen = true;
    },
    setCostDrawer(state, action) {
      state.costDrawer = action.payload;
    },
    setLandCost(state, action) {
      state.landCost = action.payload;
    },
    setListsPrice(state, action) {
      state.listPrice = action.payload;
    },
    setCustPartCode(state, action) {
      state.custPartCode = action.payload;
    },
    setCustPartPayload(state, action) {
      const { CUS_ID } = action.payload;
      const newRow = {
        VEN_ID: "",
        CODE: "",
        ACTIVE_FLAG: "N",
        CUS_ID: CUS_ID,
        PAR_ID: state.formIndex.PAR_ID,
        PARNAMEOVR_ID: "",
      };
      state.custPartPayload.push(newRow);
    },
    setClearCustPartPayload(state, action) {
      state.custPartPayload = [];
    },
    setPartNameOverride(state, action) {
      state.partNameOverride = action.payload;
    },
    setEditFormVariance(state, action) {
      state.editFormVariance = action.payload;
    },
    setWareHouse(state, action) {
      state.warehouse = action.payload;
    },
    setPurchaseGroup(state, action) {
      state.purchaseGroup = action.payload;
    },
    setProdCat(state, action) {
      state.prodCat = action.payload;
    },
    setBrand(state, action) {
      state.brand = action.payload;
    },

    setNewKitClose(state, action) {
      state.isNewkitOpen = false;
      state.selectedKitWAR_ID = null;
    },

    setImagesData(state, action) {
      state.ImagesData = action.payload;
    },
    setPostKitRes(state, action) {
      state.postKitRes = action.payload;
    },
    setDuplicateLotData(state, action) {
      state.duplicateLotData = action.payload;
    },
    setDuplicateDrawer(state, action) {
      state.duplicateDrawer = action.payload;
    },
    setSectionTo(state, action) {
      state.sectionToData = action.payload;
    },
    setLocationOptions(state, action) {
      state.locationOptions = action.payload;
    },
    setRowTo(state, action) {
      state.rowOptions = action.payload;
    },
    setBinTo(state, action) {
      state.binOptions = action.payload;
    },
    setIsCheckedFItem(state, action) {
      state.isCheckedFItem = action.payload;
    },
    removeSameIndex: (state, action) => {
      state.isCheckedFItem = state.isCheckedFItem.filter(
        (item) => item !== action.payload
      );
    },
    deleteAttachment: (state, action) => {
      return state?.ImagesData?.filter(
        (attachment) => attachment.SOURCE_ORASEQ !== action.payload
      );
    },
    closeModal(state, action) {
      state.isModal = false;
      state.formIndex = null;
      state.editDetForm = [];
      state.editFormVariance = [];
      state.ImagesData = [];
    },
    closeKitModal(state, action) {
      state.isKitModal = false;
      state.kitFormIndex = null;
      state.editKitForm = [];
      state.KitImagesData = [];
      state.selectedKitWAR_ID = null;
    },
    setKitImagesData(state, action) {
      state.KitImagesData = action.payload;
    },
    KitdeleteAttachment: (state, action) => {
      return state?.KitImagesData?.filter(
        (attachment) => attachment.SOURCE_ORASEQ !== action.payload
      );
    },
    setRefresh(state, action) {
      state.refresh = true;
    },
    setEditDetForm(state, action) {
      state.editDetForm = action?.payload[0];
    },
    setEditKitForm(state, action) {
      state.editKitForm = action?.payload[0];
    },

    setEditKitCust(state, action) {
      state.editKitCust = action?.payload;
    },
    setPartList(state, action) {
      state.partList = action.payload;
    },
    setEditKitDetForm(state, action) {
      state.editKitDetForm = action.payload;
    },

    setAddKitItem(state, action) {
      const newKitItem = {
        KITDET_ID: action.payload.id.KITDET_ID
          ? action.payload.id.KITDET_ID
          : "",
        QUANTITY: null,
        DESCRIPTION: action.payload.id.DESCRIPTION,
        PAR_ID: action.payload.id.PAR_ID,
        PAR_CODE: action.payload.id.PAR_CODE,
        BARCODE_NUMBER: action.payload.id.BARCODE_NUMBER,
        STANDARD_COST: action.payload.id.NET_COST,
        PRICE: action.payload.id.PRICE,
        ASSIGNED_LOTS: null,
        ASSIGNED_LOT_IDS: null,
        AVL_QTY_LOT: null,
        OH_QTY_LOT: null,
        EXPIRY_DATE: null,
        PURGRO_ID: null,
        PURCHASE_GROUP: null,
        COLOR_CODE: null,
        NON_STOCK_ITEM_FLAG: action.payload.id.NON_STOCK_ITEM_FLAG,
      };
      const updatedAddKitItem = [...state.kitSubGrid, newKitItem];
      return {
        ...state,
        kitSubGrid: updatedAddKitItem,
      };
    },

    setKitSubGrid(state, action) {
      state.kitSubGrid = action.payload;
    },

    updateKitWarId(state, action) {
      state.selectedKitWAR_ID = action.payload;
    },
    setAvlQty(state, action) {
      state.avlQty = action.payload;
    },
    setKitQty(state, action) {
      state.kitQty = action.payload;
    },
    setQtyUsed(state, action) {
      state.qtyUsed = action.payload;
    },

    updateKitItemPurGroID(state, action) {
      return {
        ...state,
        kitSubGrid: state.kitSubGrid.map((item) => {
          if (item.PAR_ID === action.payload.id) {
            return {
              ...item,
              PURGRO_ID: action.payload.purGroId,
              COLOR_CODE: action.payload.color,
              PURCHASE_GROUP: action.payload.Code,
            };
          }
          return item;
        }),
      };
    },

    updateKitItemLot(state, action) {
      state.kitSubGrid = state.kitSubGrid.map((item) => {
        if (item.PAR_ID === action.payload.id) {
          return {
            ...item,
            ASSIGNED_LOTS: action.payload.LOT_NUMBER,
            ASSIGNED_LOT_IDS: action.payload.InvParLOtId,
            AVL_QTY_LOT: action.payload.AVL_QTY_LOT,
            OH_QTY_LOT: action.payload.OH_QTY_LOT,
            EXPIRY_DATE: action.payload.EXPIRY_DATE,
          };
        }
        return item;
      });
    },
    updateKitItemQty(state, action) {
      state.kitSubGrid = state.kitSubGrid.map((item) => {
        if (item.PAR_ID === action.payload.id) {
          return {
            ...item,
            QUANTITY: action.payload.qnt,
          };
        }
        return item;
      });
    },
    clearKitSubGrid(state) {
      state.kitSubGrid = [];
    },
    clearPartData(state) {
      state.editDetForm = null;
      state.duplicateLotData = [];
      state.binOptions = [];
      state.rowOptions = [];
      state.locationOptions = [];
      state.sectionToData = [];
    },
    clearKitDetForm(state) {
      state.editKitForm = null;
      state.kitSubGrid = [];
    },
    setLoader(state, action) {
      state.mainLoader = action.payload;
    },
  },
});

export default pmSlices;

export const {
  setProdCat,
  setBrand,
  EditForm,
  KitEditForm,
  NewModal,
  closeModal,
  closeKitModal,
  setGetUpsale,
  setRefresh,
  setClearCustPartPayload,
  setEditDetForm,
  setEditKitForm,
  setEditKitDetForm,
  setPartNameOverride,
  setEditKitCust,
  setPartList,
  setReportDrawer,
  setCostDrawer,
  setAddKitItem,
  updateKitItemPurGroID,
  updateKitItemLot,
  setKitSubGrid,
  updateKitItemQty,
  updateKitWarId,
  setImagesData,
  deleteAttachment,
  clearKitSubGrid,
  KitdeleteAttachment,
  setKitImagesData,
  setAvlQty,
  setLandCost,
  setKitQty,
  setNewKitClose,
  setNewKitOpen,
  setPostKitRes,
  setQtyUsed,
  setWareHouse,
  setPurchaseGroup,
  setDuplicateLotData,
  setDuplicateDrawer,
  setSectionTo,
  setLocationOptions,
  setRowTo,
  setBinTo,
  setIsCheckedFItem,
  removeSameIndex,
  clearPartData,
  clearKitDetForm,
  setListsPrice,
  setEditFormVariance,
  setLoader,
} = pmSlices.actions;
