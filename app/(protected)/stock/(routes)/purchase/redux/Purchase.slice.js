import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { ACTION_FAST_REFRESH } from "next/dist/client/components/router-reducer/router-reducer-types";
import { Actor } from "next/font/google";

const PurchaseSlices = createSlice({
  name: "PurchaseSlice",
  initialState: {
    //search start
    searchQuery: "",
    availableQuantity: 0,
    splitVailableQuantity: 0,
    searchedData: [],
    checkItemsForR: [],
    isHitApi: false,
    isRemoveLot: true,
    serchState: "",
    postIssueZeroState: false,
    newPostIssueZeroState: false,
    postPurchasePayload: null,
    //end search

    //right drawer
    // username: localStorage.getItem("username"),
    // user_ID: localStorage.getItem("use_id"),
    ChatData: [],
    editorData: "",
    postLikes: [],
    files: [],
    //end right drawer

    subGridState: [],
    pageState: 0,
    formIndex: null,
    skuList: [],
    valSkuList: [],
    lotList: [],
    updatePayload: {
      PAR_ID: "",
    },

    purchaseOrderDetails: {},

    postPurchaseDetail: [],
    splitPostPurcahseDetail: [],
    splitpurchaseOrderDetails: [],
    postPurchaseOrder: [],
    //this payload for issue
    NewpostPurchaseOrder: {
      APPROVED_FLAG: "Y",
      ETA_DATE: "",
      FNZ_USE_ID: "2694",
      PO_DATE: "",
      NOTES: "",
      REFERENCE_NUMBER: "",
      PREPARED_DATE: "",
      PURORD_ID: "",
      TERMS_CONDITION: "",
      USE_ID_APRVD_BY: "2694",
      USE_ID_COMPT_BY: "2694",
      USE_ID_PREPARED_BY: "2694",
      VEN_ID: "",
      VOID_FLAG: "",
      VOID_NOTES: "",
      WAR_ID: "2190",
    },
    FormStatus: null,
    subGridStatus: null,
    VenderList: [],
    venderListData: {
      phone: "",
      email: "",
      address: "",
    },
    VenderOption: [],
    Refresh: false,
    closeModall: false,
    ActiveAddItems: false,
    ReceavingPO: {},
    slectedSku: [],
    focusFooter: "",
    //this payload is for new
    newPurchaseForm: {
      data: {
        // APPROVED_FLAG: "Y",
        ETA_DATE: "",
        FNZ_USE_ID: "2694",
        PO_DATE: "",
        NOTES: "",
        REFERENCE_NUMBER: "",
        PREPARED_DATE: "",
        PURORD_ID: "",
        TERMS_CONDITION: "",
        USE_ID_APRVD_BY: "2694",
        USE_ID_COMPT_BY: "2694",
        USE_ID_PREPARED_BY: "2694",
        VEN_ID: "",
        VOID_FLAG: "",
        VOID_NOTES: "",
        WAR_ID: "2190",
      },
      action: "InventoryWeb",
      method: "PostPurchaseOrder",
      username: "admin",
      type: "rpc",
      tid: "144",
    },
    OpenNewModall: false,
    openModallForm: false,
    purchseSubGridActF: {},
    headVis: false,
    subGridTotal: 0,
    subGridActiveNewitems: false,
    SubGridDisAv: 0,
    SubGridLCost: 0,
    SubGridCostT: 0,
    SubGridCaseValue: 0,

    SubGridOhT: 0,
    SubGridQuntT: 0,
    SubGridNetCostT: 0,
    PurchaseHead: [],
    defHead: [],
    purchaseMainGrid: [],
    GridFilterState: {},
    GridFilterStateA: false,
    pageCount: 25,
    FTTo: {},
    WareHouse: [],
    selectedVid: null,
    SelectedWarid: {},
    PScreenS: {},
    CsvData: [],
    subData: [],
    subPayload: null,
    splitRowQuantity: 0,
    splitPurchaseRowQuantity: 0,
    splitDrawer: false,
    lotCreate: false,
    splitLotCreate: false,
    formSplitLotCreate: false,
    formOnSplitLotCreate: false,
    selectedSubOrderId: null,
    addNewRowFlag: false,
    onDeleteRows: false,
    mainLoader:false,
  },
  reducers: {
    loaderToggle(state, action) {
      state.mainLoader = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCheckedItemsR(state, action) {
      state.checkItemsForR = action.payload;
    },
    setIsHitApi(state, action) {
      state.isHitApi = action.payload;
    },
    setIsRemoveLot(state, action) {
      state.isRemoveLot = action.payload;
    },
    addNewRowSubData(state, action) {
      state.addNewRowFlag = action.payload;
    },
    setSearchData(state, action) {
      state.searchedData[0] = action.payload;
    },
    //rightDrawer actions
    setChatData(state, action) {
      state.ChatData.push(action.payload);
    },
    setEditorData(state, action) {
      state.editorData = action.payload;
    },
    setPostLikes(state, action) {
      const { postId, userId } = action.payload;

      const postIndex = state.ChatData.findIndex((post) => post.id === postId);
      // console.log(postIndex);
      if (postIndex !== -1) {
        const post = state.ChatData[postIndex];

        if (!post.likedBy.includes(userId)) {
          state.ChatData[postIndex] = {
            ...post,
            likes: post.likes + 1,
            likedBy: [...post.likedBy, userId],
          };
        } else {
          // console.log("user already included");
        }
      } else {
        // console.log("not");
      }
    },
    addFile(state, action) {
      state.files.push(action.payload);
    },
    //rightDrawer actions end

    openForm(state, action) {
      state.formIndex = action.payload.PURORD_ID;
      state.openModallForm = true;
      // // console.log("modall open redux", action.payload);
    },

    subGridset(state, action) {
      state.subGridState = action.payload;
      state.ActiveAddItems = false;
      // console.log("modall subgrid state open redux", action.payload);
    },

    subGridStatusUpdate(state, action) {
      state.subGridStatus = action.payload;
    },

    purchaseSku(state, action) {
      state.skuList = action.payload;

      const option = action.payload.map((data) => {
        const list = {};

        list.value = data.PAR_ID;
        list.label = data.PAR_CODE;

        return list;
      });
      state.valSkuList = option;
      // // console.log('redux option listtt' , option);
      // state.VenderList = action.payload;
      // state.VenderOption = option;

      // // console.log("modall open redux", action.payload);
    },

    updatePurchaseSku(state, action) {
      state.postPurchaseDetail[action.payload.indexR].PAR_ID =
        action.payload.id.PAR_ID;
      state.postPurchaseDetail[action.payload.indexR].COST =
        action.payload.id.STANDARD_COST;
      state.postPurchaseDetail[action.payload.indexR].VENDOR_QUANTITY =
        action.payload.id.TOTAL_AVAILABLE;
      state.subGridState[action.payload.indexR].BARCODE_NUMBER =
        action.payload.id.BARCODE_NUMBER;
      state.subGridState[action.payload.indexR].DESCRIPTION =
        action.payload.id.DESCRIPTION;
      state.subGridState[action.payload.indexR].COST =
        action.payload.id.STANDARD_COST;
      state.subGridState[action.payload.indexR].LAST_COST =
        action.payload.id.STANDARD_COST;
      state.subGridState[action.payload.indexR].QTY_ONHAND =
        action.payload.id.OH_QUANTITY;
      state.subGridState[action.payload.indexR].CONVERSION_INTO_STOCKING_UOM =
        action.payload.id.CONVERSION_INTO_STOCKING_UOM;
      state.subGridState[action.payload.indexR].PAR_ID =
        action.payload.id.PAR_ID;
      state.subGridState[action.payload.indexR].NET_COST =
        action.payload.id.NET_COST;
      state.subGridState[action.payload.indexR].DISCOUNT =
        action.payload.id.DISCOUNT;

      state.slectedSku.push(action.payload.id);

      // // console.log("check sku change", action.payload.id);
    },
    setNewItem(state, action) {
      // console.log(action.payload, 'sku description')
      // Create the new item
      const newItem = {
        PURORDDET_ID: "",
        PURORD_ID: state.purchaseOrderDetails.PURORD_ID,
        PAR_ID: action.payload.id.PAR_ID,
        SEQ_NUMBER: 1.0,
        PART_NUMBER: action.payload.id.PAR_CODE,
        NON_STOCK_ITEM_FLAG: "N",
        PART_DESCRIPTION: action.payload.id.DESCRIPTION,
        SKU_MANUFACTURE: "",
        UPC_MANUFACTURE: "",
        NAME: "",
        DESCRIPTION: action.payload.id.DESCRIPTION,
        BARCODE_NUMBER: action.payload.id.BARCODE_NUMBER,
        QUANTITY: 0,
        UOM_ID_REORDERING: null,
        REORDERING_UOM: null,
        COST: action.payload.id.STANDARD_COST,
        LAST_COST: action.payload.id.STANDARD_COST,
        QTY_RECEIVED: 0.0,
        COLOR: null,
        READY_FOR_RECEIVING_FLAG: "N",
        CATALOGUE_NUMBER: null,
        PART_COST: 0,
        QUARANTINE_FLAG: "N",
        CONVERSION_INTO_STOCKING_UOM:
          action.payload.id.CONVERSION_INTO_STOCKING_UOM,
        LOT_NUMBER: null,
        EXPIRY_DATE: null,
        INVPARLOT_ID: null,
        QTY_ONHAND: action.payload.id.OH_QUANTITY,
        QTY_AVAILABLE: 0.0,
        LOT_INITIAL_STATUS: null,
        ISSUED_FLAG: "Y",
        RECEIVING_NUMBER: null,
        RECEIVING_DATE: null,
        INVREC_ID: null,
        VENDOR_QUANTITY: 0,
        EXPIRY_DATE_PDF: null,
        NET_COST: action.payload.id.NET_COST,
      };

      // Create a new array by combining the existing subGridState and newItem
      const updatedSubGridState = [...state.subGridState, newItem];

      return {
        ...state,
        subGridState: updatedSubGridState,
        postPurchaseDetail: [
          ...state.postPurchaseDetail,
          {
            CATALOG_NUMBER: "",
            COST: action.payload.id.STANDARD_COST,
            DELETED_FLAG: "N",
            DESCRIPTION: action.payload.id.DESCRIPTION,
            PART_DESCRIPTION: action.payload.id.DESCRIPTION,
            INVPARLOT_ID: null,
            LOT_NUMBER: null,
            PAR_ID: action.payload.id.PAR_ID,
            PURORDDET_ID: "",
            PURORD_ID: state.purchaseOrderDetails.PURORD_ID,
            QUANTITY: 0,
            QUARANTINE_FLAG: "N",
            READY_FOR_RECEIVING_FLAG: "N",
            USE_ID: "",
            VENDOR_QUANTITY: action.payload.id.TOTAL_AVAILABLE,
            WORORD_ID: "",
            NET_COST: action.payload.id.NET_COST,
            DISCOUNT: action.payload.id.DISCOUNT,
          },
        ],
        ActiveAddItems: true,
        purchseSubGridActF: {
          index: updatedSubGridState.length - 1,
          field: "OrdQ",
        },
      };
    },

    updatePurchaseCost(state, action) {
      state.postPurchaseDetail[action.payload.indexR].COST =
        action.payload.cost;

      // // console.log("check cost change", action.payload.cost);
    },

    updatePurchaseLCost(state, action) {
      state.postPurchaseDetail[action.payload.indexR].LAST_COST =
        action.payload.cost;

      // // console.log("check cost change", action.payload.cost);
    },

    updatePurchaseOrdQnt(state, action) {
      const num = parseInt(action.payload.qnt, 10);
      // state.postPurchaseDetail[action.payload.indexR].QUANTITY =
      //   action.payload.qnt;
      state.postPurchaseDetail[action.payload.indexR].QUANTITY = num;
      state.subGridState[action.payload.indexR].QUANTITY = action.payload.qnt;

      if (action.payload.qnt > 0) {
        state.ActiveAddItems = false;
      } else {
        state.ActiveAddItems = true;
      }
      // // console.log("check cost change", action.payload.qnt);
    },

    NewPurchaseNotes(state, action) {
      //for new
      state.newPurchaseForm.data = {
        ...state.newPurchaseForm.data,
        NOTES: action.payload,
      };

      //for issue
      state.NewpostPurchaseOrder = {
        ...state.NewpostPurchaseOrder,
        NOTES: action.payload,
      };

      // // console.log("check notes change madiha redux", action.payload);
    },
    updatePurchaseNotes(state, action) {
      state.postPurchaseOrder[0].NOTES = action.payload;
    },
    updatePurchaseRef(state, action) {
      state.postPurchaseOrder[0].REFERENCE_NUMBER = action.payload;
    },

    NewPurchaseRef(state, action) {
      state.newPurchaseForm.data = {
        ...state.newPurchaseForm.data,
        REFERENCE_NUMBER: action.payload,
      };
      state.NewpostPurchaseOrder = {
        ...state.NewpostPurchaseOrder,
        REFERENCE_NUMBER: action.payload,
      };
      // // console.log("check Reference number change madiha redux", action.payload);
    },

    updatePurchaseLot: (state, action) => {
      const { id, inv, exp, parId } = action.payload;

      const item = state.postPurchaseDetail.find(
        (item) => item.PAR_ID === parId
      );
      if (item) {
        item.LOT_NUMBER = id;
        item.READY_FOR_RECEIVING_FLAG = "Y";
        item.PURORD_ID = item.PURORD_ID ? JSON.stringify(item.PURORD_ID) : "";
        item.INVPARLOT_ID = inv;
      }

      const subGridItem = state.subGridState.find(
        (item) => item.PAR_ID === parId
      );
      if (subGridItem) {
        subGridItem.EXPIRY_DATE = exp;
        subGridItem.LOT_NUMBER = id;
      }
    },
    setPurchaseDetails(state, action) {
      // console.log("check the purchase detail redux", action.payload);
      state.FormStatus = action.payload.PO_CURRENT_STATUS;

      state.purchaseOrderDetails = action.payload;
    },

    setUpdatePurchaseDetail(state, action) {
      const newArr2 = action.payload.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          // Check if the property value is undefined, replace it with ""
          newObj[key] = obj[key] === undefined ? "" : obj[key];
          newObj.DELETED_FLAG = "N";
          if (
            (state.FormStatus == "Issued to Vendor" ||
              state.FormStatus == "Partially Ready for Receiving") &&
            (newObj?.NON_STOCK_ITEM_FLAG == "Y" ||
              newObj.LOT_NUMBER != null ||
              newObj.LOT_NUMBER != "")
          ) {
            newObj.READY_FOR_RECEIVING_FLAG = "Y";
          }
        }

        // Additional condition to set flag to "N" if lotNumber is not null
        if (
          (newObj.LOT_NUMBER == null || newObj.LOT_NUMBER == "") &&
          newObj?.NON_STOCK_ITEM_FLAG == "N"
        ) {
          newObj.READY_FOR_RECEIVING_FLAG = "N";
        }

        return newObj;
      });

      // Assuming you want to update the state with newArr2
      return {
        ...state,
        postPurchaseDetail: newArr2,
      };
    },

    setUpdatePurchaseOrder(state, action) {
      // // console.log('log filter ' , action.payload );
      const newArr = action.payload.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          // Check if the property value is undefined, replace it with ""
          newObj[key] = obj[key] === undefined ? "" : obj[key];
          // newObj.FNZ_USE_ID = state.purchaseOrderDetails[0]?.USER_ID_PREPARED_BY;
        }
        return newObj;
      });

      // state.postPurchaseDetail = newArr;
      state.postPurchaseOrder = newArr;
    },

    setLotList(state, action) {
      state.lotList = action.payload;
    },

    setProductOrederUpdate(state, action) {},

    setIssueStatus(state, action) {
      // state.postPurchaseOrder[0].APPROVED_FLAG = 'Y'
      // // console.log('check issue redux' , state.purchaseOrderDetails?.USER_ID_PREPARED_BY);
      const stringFNZ_USE_ID =
        state.purchaseOrderDetails?.USER_ID_PREPARED_BY != null
          ? JSON.stringify(state.purchaseOrderDetails.USER_ID_PREPARED_BY)
          : "";

      return produce(state, (draftState) => {
        draftState.postPurchaseOrder[0].APPROVED_FLAG = "Y";
        draftState.postPurchaseOrder[0].COMPLETE_FLAG = "N";
        draftState.postPurchaseOrder[0].FNZ_FLAG = "N";
        draftState.postPurchaseOrder[0].FNZ_USE_ID = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_APRVD_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_COMPT_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_PREPARED_BY = stringFNZ_USE_ID;
      });
    },
    //     setNewIssueStatus(state, action) {

    //   -

    //   return state.postPurchaseOrder[0].push({
    //       APPROVED_FLAG:  "Y",
    //       ETA_DATE: "",
    //       FNZ_USE_ID: stringFNZ_USE_ID,
    //       PO_DATE: "",
    //       PREPARED_DATE:  "",
    //       PURORD_ID: "",
    //       TERMS_CONDITION: "",
    //       USE_ID_APRVD_BY:  stringFNZ_USE_ID,
    //       USE_ID_COMPT_BY:  stringFNZ_USE_ID,
    //       USE_ID_PREPARED_BY:  stringFNZ_USE_ID,
    //       VEN_ID:  "",
    //       VOID_FLAG:  "",
    //       VOID_NOTES:  "",
    //       WAR_ID:  null
    //     });
    // },

    setReadyForRStatus(state, action) {
      const stringFNZ_USE_ID =
        state.purchaseOrderDetails?.USER_ID_PREPARED_BY != null
          ? JSON.stringify(state.purchaseOrderDetails.USER_ID_PREPARED_BY)
          : "";
      // // console.log('check redux string' , string);
      return produce(state, (draftState) => {
        draftState.postPurchaseOrder[0].APPROVED_FLAG = "Y";
        draftState.postPurchaseOrder[0].COMPLETE_FLAG = "Y";
        draftState.postPurchaseOrder[0].FNZ_USE_ID = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_APRVD_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_COMPT_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_PREPARED_BY = stringFNZ_USE_ID;

        draftState.postPurchaseOrder[0].FNZ_FLAG = "N";
        draftState.ReceavingPO = {
          PURORD_ID: state.postPurchaseOrder[0].PURORD_ID,
          USE_ID: stringFNZ_USE_ID,
        };
      });
    },

    returnReadyForRStatus(state, action) {
      const stringFNZ_USE_ID =
        state.purchaseOrderDetails?.USER_ID_PREPARED_BY != null
          ? JSON.stringify(state.purchaseOrderDetails.USER_ID_PREPARED_BY)
          : "";
      // // console.log('check redux string' , string);
      return produce(state, (draftState) => {
        draftState.postPurchaseOrder[0].APPROVED_FLAG = "N";
        draftState.postPurchaseOrder[0].COMPLETE_FLAG = "N";
        draftState.postPurchaseOrder[0].FNZ_USE_ID = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_APRVD_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_COMPT_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_PREPARED_BY = stringFNZ_USE_ID;

        draftState.postPurchaseOrder[0].FNZ_FLAG = "N";
        draftState.ReceavingPO = {
          PURORD_ID: state.postPurchaseOrder[0].PURORD_ID,
          USE_ID: stringFNZ_USE_ID,
        };
      });
    },

    setVender(state, action) {
      const option = action.payload.map((data) => {
        const list = {};

        list.value = data.VEN_ID;
        list.label = data.SUPPLIER;

        return list;
      });
      state.VenderList = action.payload;
      state.VenderOption = option;

      // // console.log("vender redux", action.payload , option);
    },
    setVenderListFormData: (state, action) => {
      state.venderListData = { ...action.payload };
    },

    clearVenderListFormData: (state) => {
      state.venderListData = {
        phone: "",
        email: "",
        address: "",
      };
    },

    setRefresh(state, action) {
      state.Refresh = action.payload;
      state.subPayload = null;
      state.subData = [];
    },
    setcloseModall(state, action) {
      state.closeModall = action.payload;
      state.postPurchaseOrder = [];

      state.subGridState = [];
    },

    openSplitModall(state, action) {
      // state.splitPostPurcahseDetail.push(state.postPurchaseDetail[action.payload])
      const {
        PURORDDET_ID,
        PURORD_ID,
        PAR_ID,
        // UOM_REORDER,
        DESCRIPTION,
        CATALOG_NUMBER,
        QUANTITY,
        DELETED_FLAG,
        WORORD_ID,
        COST,
        USE_ID,
        LOT_NUMBER,
        // EXPIRY_DATE,
        QUARANTINE_FLAG,
        READY_FOR_RECEIVING_FLAG,
        INVPARLOT_ID,
        // VENDOR_QUANTITY,
        // NON_STOCK_ITEM_PURCHASE_ORDER_FLAG
      } = state.postPurchaseDetail[action.payload];

      const items = {
        PURORDDET_ID,
        PURORD_ID,
        PAR_ID,
        // UOM_REORDER,
        DESCRIPTION,
        CATALOG_NUMBER,
        QUANTITY: 0,
        DELETED_FLAG,
        WORORD_ID,
        COST,
        USE_ID,
        LOT_NUMBER,
        // EXPIRY_DATE,
        QUARANTINE_FLAG,
        READY_FOR_RECEIVING_FLAG,
        INVPARLOT_ID,
        // VENDOR_QUANTITY,
        // NON_STOCK_ITEM_PURCHASE_ORDER_FLAG
      };
      state.splitPostPurcahseDetail.push(items);

      state.splitpurchaseOrderDetails.push(state.subGridState[action.payload]);
      state.splitRowQuantity = items.QUANTITY;
    },
    SplitsetLot(state, action) {
      const string =
        state.splitPostPurcahseDetail[action.payload.indexR].PURORD_ID != null
          ? JSON.stringify(
              state.splitpurchaseOrderDetails[action.payload.indexR].PURORD_ID
            )
          : "";

      state.splitPostPurcahseDetail[action.payload.indexR].LOT_NUMBER =
        action.payload.id;
      state.splitPostPurcahseDetail[action.payload.indexR].INVPARLOT_ID =
        action.payload.inv;
      state.splitPostPurcahseDetail[
        action.payload.indexR
      ].READY_FOR_RECEIVING_FLAG = "N";
      // state.splitPostPurcahseDetail[action.payload.indexR].PURORD_ID     = string
      return produce(state, (draftState) => {
        state.splitpurchaseOrderDetails[action.payload.indexR].LOT_NUMBER =
          action.payload.id;
        state.splitpurchaseOrderDetails[action.payload.indexR].EXPIRY_DATE =
          action.payload.exp;
        state.splitpurchaseOrderDetails[action.payload.indexR].id =
          action.payload.id;
      });
    },

    SplitsetLotChange(state, action) {
      state.splitPostPurcahseDetail[action.payload.indexR].LOT_NUMBER = null;
      state.splitPostPurcahseDetail[action.payload.indexR].INVPARLOT_ID = null;
      state.splitPostPurcahseDetail[
        action.payload.indexR
      ].READY_FOR_RECEIVING_FLAG = "N";
      // state.splitPostPurcahseDetail[action.payload.indexR].PURORD_ID     = string
      return produce(state, (draftState) => {
        state.splitpurchaseOrderDetails[action.payload.indexR].EXPIRY_DATE =
          null;
        state.splitpurchaseOrderDetails[action.payload.indexR].LOT_NUMBER =
          null;
        state.splitpurchaseOrderDetails[action.payload.indexR].id = null;
      });
    },

    splitAlocatedQnt(state, action) {
      state.splitPostPurcahseDetail[action.payload.indexR].QUANTITY =
        action.payload.qnt;
    },

    setNewsplit(state, action) {
      state.splitpurchaseOrderDetails.push({
        PURORDDET_ID: action.payload.purID,
        PURORD_ID: action.payload.puorder,
        PAR_ID: action.payload.par_id,
        SEQ_NUMBER: 1.0,
        // PART_NUMBER: "TRAINIGSKU-02",
        NON_STOCK_ITEM_FLAG: "N",
        PART_DESCRIPTION: "  ",
        SKU_MANUFACTURE: "",
        UPC_MANUFACTURE: "",
        NAME: "",
        BARCODE_NUMBER: "",
        QUANTITY: 0,
        UOM_ID_REORDERING: null,
        REORDERING_UOM: null,
        COST: action.payload.cost,
        LAST_COST: 0,
        QTY_RECEIVED: 0.0,
        COLOR: null,
        READY_FOR_RECEIVING_FLAG: "N",
        CATALOGUE_NUMBER: null,
        PART_COST: 0,
        QUARANTINE_FLAG: "N",
        CONVERSION_INTO_STOCKING_UOM: 0,
        LOT_NUMBER: null,
        EXPIRY_DATE: null,
        INVPARLOT_ID: null,
        QTY_ONHAND: 0.0,
        QTY_AVAILABLE: 0.0,
        LOT_INITIAL_STATUS: null,
        ISSUED_FLAG: "Y",
        RECEIVING_NUMBER: null,
        RECEIVING_DATE: null,
        INVREC_ID: null,
        VENDOR_QUANTITY: 0,
        EXPIRY_DATE_PDF: null,
      });

      state.splitPostPurcahseDetail.push({
        CATALOG_NUMBER: "",
        COST: action.payload.cost,
        DELETED_FLAG: "N",
        DESCRIPTION: "",
        INVPARLOT_ID: null,
        LOT_NUMBER: null,
        PAR_ID: action.payload.par_id,
        PURORDDET_ID: "",
        PURORD_ID: action.payload.puorder,
        QUANTITY: 0,
        QUARANTINE_FLAG: "N",
        READY_FOR_RECEIVING_FLAG: "N",
        USE_ID: "",
        WORORD_ID: "",
      });
    },

    subGridDelete(state, action) {
      let rem = state.subGridState.filter((_, i) => action.payload !== i);
      let remP = state.postPurchaseDetail.filter(
        (_, i) => action.payload !== i
      );
      // console.log("redux action.payload", action.payload, rem);
      state.subGridState = rem;
      state.postPurchaseDetail = remP;
    },
    getFocused(state, action) {
      // // console.log('check redux title grid' , action.payload);
      if (action.payload.focus == true) {
        state.focusFooter = {
          checkTitle: action.payload.title,
          set: action.payload.focus,
        };
      } else {
        state.focusFooter = "";
      }
    },
    // this is working code for notes ref update
    newPurchase(state, action) {
      // state.newPurchaseForm = action.payload
      // console.log("newPurchaseForm madiha redux", state.newPurchaseForm);

      // if(action.payload.IssuePayload != undefined){
      //   state.NewpostPurchaseOrder = action.payload.IssuePayload
      state.FormStatus = "New";
      //   // console.log("NewpostPurchaseOrder madiha redux" , action.payload.IssuePayload);

      // }

      state.OpenNewModall = true;
    },

    setSelectedVeNid(state, action) {
      state.selectedVid = action.payload;

      //for new
      state.newPurchaseForm.data = {
        ...state.newPurchaseForm.data,
        VEN_ID: action.payload.ven_id,
        PO_DATE: action.payload.po_date,
        PREPARED_DATE: action.payload.prepared_date,
      };
      //for issue
      state.NewpostPurchaseOrder = {
        ...state.NewpostPurchaseOrder,
        VEN_ID: action.payload.ven_id,
        PO_DATE: action.payload.po_date,
        PREPARED_DATE: action.payload.prepared_date,
      };

      // // console.log("checking redux madiha newpurchaseform",state.NewpostPurchaseOrder)
    },
    setVenid(state, action) {
      state.selectedVid = action.payload;
    },
    setSelectedWarid(state, action) {
      state.SelectedWarid = action.payload;
      // // console.log("checking redux madiha Ven ID value",action.payload)

      //for new
      state.newPurchaseForm.data = {
        ...state.newPurchaseForm.data,
        WAR_ID: action.payload.WAR_ID,
      };
      //for issue
      state.NewpostPurchaseOrder = {
        ...state.NewpostPurchaseOrder,
        WAR_ID: action.payload.WAR_ID,
      };

      // // console.log("checking redux madiha newpurchaseform",state.NewpostPurchaseOrder)
    },

    colseNewModall(state, action) {
      state.OpenNewModall = false;
      state.Refresh = true;
      state.postPurchaseOrder = "";
      state.postPurchaseDetail = [];
      state.subGridState = [];
    },

    closeModallForm(state, action) {
      state.openModallForm = false;
      state.postPurchaseDetail = [];
      state.subGridState = [];
      state.FormStatus = null;

      // // console.log('set reset chulling ' , state.openModallForm  );
    },

    openNModall(state, action) {
      state.OpenNewModall = true;
    },

    onNextFocus(state, action) {
      if (
        action.payload.field == "OrdQ" &&
        state.subGridState.length - 1 == action.payload.index
      ) {
        state.purchseSubGridActF = action.payload;
      } else if (
        action.payload.field == "OrdQ" &&
        state.subGridState.length - 1 < action.payload.index
      ) {
        state.subGridActiveNewitems = true;
      } else {
        state.purchseSubGridActF = action.payload;
      }
    },

    onHeadVis(state, action) {
      state.headVis = action.payload;
    },
    setSubGridTotal(state, action) {
      state.subGridTotal = action.payload;
    },
    setsubGridActiveNewitems(state, action) {
      state.subGridActiveNewitems = false;
    },

    setVoidStatus(state, action) {
      // state.postPurchaseOrder[0].APPROVED_FLAG = 'Y'
      // // console.log('check issue redux' , state.purchaseOrderDetails?.USER_ID_PREPARED_BY);
      const stringFNZ_USE_ID =
        state.purchaseOrderDetails?.USER_ID_PREPARED_BY != null
          ? JSON.stringify(state.purchaseOrderDetails.USER_ID_PREPARED_BY)
          : "";

      return produce(state, (draftState) => {
        draftState.postPurchaseOrder[0].VOID_FLAG = "Y";
        draftState.postPurchaseOrder[0].APPROVED_FLAG = "N";
        draftState.postPurchaseOrder[0].COMPLETE_FLAG = "N";
        draftState.postPurchaseOrder[0].FNZ_FLAG = "N";
        // draftState.postPurchaseOrder[0].FNZ_USE_ID = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_APRVD_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_COMPT_BY = stringFNZ_USE_ID;
        draftState.postPurchaseOrder[0].USE_ID_PREPARED_BY = stringFNZ_USE_ID;
      });
    },

    updatePurchaseNotesV(state, action) {
      state.postPurchaseOrder[0].VOID_NOTES = action.payload;

      // // console.log("check notes change", action.payload);
    },

    setSubGridLCostTotal(state, action) {
      return {
        ...state,
        SubGridLCost: action.payload.LCost,
        SubGridNetCostT: action.payload.NetCT,
        SubGridCostT: action.payload.CostT,
        SubGridQuntT: action.payload.OqT,
        SubGridDisAv: action.payload.AvDis,
        SubGridOhT: action.payload.OhQnt,
        SubGridCaseValue: action.payload.CaseV,
      };
    },

    setDiscount(state, action) {
      if (action.payload.cat === "dis") {
        state.postPurchaseDetail[action.payload.indexR].DISCOUNT =
          action.payload.val;
        state.subGridState[action.payload.indexR].DISCOUNT = action.payload.val;
        let Per =
          (state.postPurchaseDetail[action.payload.indexR].COST *
            Number(state.postPurchaseDetail[action.payload.indexR].DISCOUNT)) /
          100;
        let value = state.postPurchaseDetail[action.payload.indexR].COST - Per;
        state.postPurchaseDetail[action.payload.indexR].NET_COST = Number(
          value.toFixed(2)
        );
        state.subGridState[action.payload.indexR].NET_COST = Number(
          value.toFixed(2)
        );
      } else if (action.payload.cat === "net") {
        let Per =
          (state.postPurchaseDetail[action.payload.indexR].COST -
            Number(action.payload.data)) /
          state.postPurchaseDetail[action.payload.indexR].COST;
        let value = Per * 100;
        state.postPurchaseDetail[action.payload.indexR].NET_COST =
          action.payload.data;
        state.postPurchaseDetail[action.payload.indexR].DISCOUNT = Number(
          value.toFixed(2)
        );
        state.subGridState[action.payload.indexR].NET_COST =
          action.payload.data;
        state.subGridState[action.payload.indexR].DISCOUNT = Number(
          value.toFixed(2)
        );
      }
    },

    setHeadRedux(state, action) {
      state.PurchaseHead = action.payload;
      state.defHead = action.payload;
    },
    setEditHead(state, action) {
      if (state.PurchaseHead[action.payload].hidden == false) {
        state.PurchaseHead[action.payload].hidden = true;
      } else if (state.PurchaseHead[action.payload].hidden == true) {
        state.PurchaseHead[action.payload].hidden = false;
      }
    },
    setHeadReduxT(state, action) {
      if (action.payload.cat == true) {
        state.PurchaseHead[action.payload.index].def = true;
        state.PurchaseHead[action.payload.index].title = action.payload.hData;
      } else if (action.payload.cat == false) {
        state.PurchaseHead[action.payload.index].def = false;
        state.PurchaseHead[action.payload.index].title =
          state.defHead[action.payload.index].title;
      }
    },
    setMainPurchaseList(state, action) {
      state.purchaseMainGrid = action.payload;
    },
    gridFilter(state, action) {
      state.GridFilterState = action.payload;
      state.GridFilterStateA = true;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFToT(state, action) {
      // console.log("check redux from to", action.payload);
      state.FTTo = action.payload;
    },

    getSearchVal(state, action) {
      // // console.log('debouncing chulling' , action.payload);
      state.serchState == action.payload;

      return produce(state, (draftState) => {
        state.serchState = action.payload;
      });
    },

    setWarehouse(state, action) {
      state.WareHouse = action.payload;
      // // console.log("checking redux warehouse value",action.payload)
    },
    setPScreenS(state, action) {
      state.PScreenS = action.payload;
      // // console.log("checking redux pss value",action.payload)
    },
    setAvailableQuantity: (state, action) => {
      state.availableQuantity = action.payload;
    },
    decrementAvailableQuantity: (state, action) => {
      state.availableQuantity -= action.payload;
    },
    setCSvData(state, action) {
      // // console.log('setCsvData' , action.payload);
      state.CsvData = action.payload;
    },
    setSubGridData(state, action) {
      state.subData = action.payload;
    },
    setSplitPostPurchaseDetail(state, action) {
      state.splitPostPurcahseDetail = action.payload;
    },
    setSplitPostPurchaseDetais(state, action) {
      state.splitpurchaseOrderDetails = action.payload;
    },
    deleteSplitPostPurchaseDetail(state, action) {
      state.splitPostPurcahseDetail = action.payload;
    },
    clearSplitsGrid(state) {
      (state.splitPostPurcahseDetail = []),
        (state.splitpurchaseOrderDetails = []);
    },

    setPostIssueStatas(state, action) {
      state.postIssueZeroState = action.payload;
    },
    setNewPostIssueStatus(state, action) {
      state.newPostIssueZeroState = action.payload;
    },

    setPostPurchasePayload(state, action) {
      state.postPurchasePayload = action.payload;
    },

    readySubGridPayLoad(state, action) {
      // // console.log('check log for subCost redux 1', action.payload.id );

      const findSubOrder = state.subData?.find(
        (data) => data.id == action.payload.id
      );

      // const findSubOrderCons = JSON.parse(JSON.stringify(findSubOrder));

      // // console.log('check log for subCost redux 1.5', action.payload.id , findSubOrderCons.product );

      if (findSubOrder) {
        // // console.log('check log for subCost redux 1.9'  );

        const getFilter = findSubOrder.product.map((items) => {
          const {
            PURORDDET_ID,
            PURORD_ID,
            PAR_ID,
            // UOM_REORDER,
            DISCOUNT,
            DESCRIPTION,
            CATALOG_NUMBER,
            QUANTITY,
            DELETED_FLAG,
            WORORD_ID,
            COST,
            USE_ID,
            LOT_NUMBER,
            // EXPIRY_DATE,
            QUARANTINE_FLAG,
            READY_FOR_RECEIVING_FLAG,
            INVPARLOT_ID,
            VENDOR_QUANTITY,
            NET_COST,
            // NON_STOCK_ITEM_PURCHASE_ORDER_FLAG
          } = items;

          return {
            PURORDDET_ID,
            PURORD_ID: PURORD_ID.toString(),

            PAR_ID,

            // UOM_REORDER,
            DISCOUNT,
            NET_COST,

            DESCRIPTION,

            CATALOG_NUMBER,

            QUANTITY,

            DELETED_FLAG: DELETED_FLAG? DELETED_FLAG : "N",

            WORORD_ID,

            COST,

            USE_ID,

            LOT_NUMBER,

            // EXPIRY_DATE,

            QUARANTINE_FLAG,

            READY_FOR_RECEIVING_FLAG,

            INVPARLOT_ID,

            VENDOR_QUANTITY: QUANTITY,

            // NON_STOCK_ITEM_PURCHASE_ORDER_FLAG
          };
        });

        // const payloadDetailCons = JSON.parse(JSON.stringify(getFilter));

        // // console.log('check log for subCost redux 1.8', action.payload.id , payloadDetailCons );

        const orderD = getFilter.map((obj) => {
          // Iterate through each property of the object
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
            //newObj.DELETED_FLAG = state.onDeleteRows == false ? "N" : "";
          }
          return newObj;
        });

        const payloadDetail = {
          data: orderD,
          method: "PostPurchaseOrderDetails",
          action: "InventoryWeb",
          tid: "144",
          type: "rpc",
          username: "admin",
        };

        const getorderFilter = findSubOrder.form.map((items) => {
          const {
            APPROVED_FLAG,
            COMPLETE_FLAG,
            ETA_DATE,
            FNZ_FLAG,
            FNZ_USE_ID,
            NOTES,
            PO_DATE,
            PREPARED_DATE,
            PURORD_ID,
            REFERENCE_NUMBER,
            TERMS_CONDITION,
            USE_ID_APRVD_BY,
            USE_ID_COMPT_BY,
            USE_ID_PREPARED_BY,
            VEN_ID,
            VOID_FLAG,
            VOID_NOTES,
            WAR_ID,
          } = items;

          return {
            APPROVED_FLAG,
            COMPLETE_FLAG,
            ETA_DATE,
            FNZ_FLAG,
            FNZ_USE_ID: "2694",
            NOTES,
            PO_DATE,
            PREPARED_DATE: new Date().toISOString().split("T")[0],
            PURORD_ID,
            REFERENCE_NUMBER,
            TERMS_CONDITION,
            USE_ID_APRVD_BY: "2694",
            USE_ID_COMPT_BY: "2694",
            USE_ID_PREPARED_BY: "2694",
            VEN_ID,
            VOID_FLAG,
            VOID_NOTES,
            WAR_ID,
          };
        });

        const orderF = getorderFilter.map((obj) => {
          // Iterate through each property of the object
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
          }
          return newObj;
        });

        const payloadOrder = {
          data: orderF[0],
          action: "InventoryWeb",
          method: "PostPurchaseOrder",
          tid: "144",
          type: "rpc",
          username: "admin",
        };

        // // console.log('check log for subCost redux 2', action.payload.id , payloadDetailCons , findSubOrderCons );

        state.subPayload = {
          detailPayload: payloadDetail,
          formPayload: payloadOrder,
        };
      }
    },
    subOrderQuantityChange(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.POId) {
          pOrder.product = pOrder.product.map((item) => {
            if (item.PURORDDET_ID == action.payload.PId) {
              item.QUANTITY = action.payload.qnt;
            }
            return item;
          }).filter((filteredItem) => filteredItem); 
        }
        return pOrder;
      });
    },

    orderProductUpdate(state, action) {
      state.subData.push(action.payload);
    },

    subOrderLotChange(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.POId) {
          pOrder.product = pOrder.product.map((item) => {
            if (item.PURORDDET_ID === action.payload.PId) {
              item.LOT_NUMBER = action.payload.Lot;
              item.INVPARLOT_ID = action.payload.invId;
              item.READY_FOR_RECEIVING_FLAG = "Y";
              item.EXPIRY_DATE = action.payload.expDate;
              item.VENDOR_QUANTITY = item.QUANTITY;
            }
            return item; 
          }).filter((filteredItem) => filteredItem); 
        }
        return pOrder;
      });
    },

    subOrderDiscChange(state, action) {
      state.subData = state.subData.filter((pOrder) => {
        if (pOrder.id == action.payload.POId) {
          pOrder.product ==
            pOrder.product.filter((item) => {
              if (item.PURORDDET_ID == action.payload.PId) {
                if (action.payload.cat == "dis") {
                  item.DISCOUNT = action.payload.val;
                  let Per = (item.COST * Number(item.DISCOUNT)) / 100;
                  let value = item.COST - Per;
                  item.NET_COST = value.toFixed(2);
                } else if (action.payload.cat == "net") {
                  let Per =
                    (item.COST - Number(action.payload.data)) / item.COST;
                  let value = Per * 100;
                  item.NET_COST = action.payload.data;
                  item.DISCOUNT = value.toFixed(2);
                }
                return item;
              }
            });
        }
        return pOrder;
      });
    },
    openSubGridSplitModal(state, action) {
      state.subData.filter((pOrder) => {
        if (pOrder.id == action.payload.POId) {
          pOrder.product ==
            pOrder.product.filter((item) => {
              if (item.PURORDDET_ID == action.payload.PId) {
                const splitItem = {
                  CATALOG_NUMBER: item.CATALOGUE_NUMBER,
                  COST: item.COST,
                  DELETED_FLAG: "N",
                  DESCRIPTION: "",
                  INVPARLOT_ID: item.INVPARLOT_ID,
                  LOT_NUMBER: item.LOT_NUMBER,
                  PAR_ID: item.PAR_ID,
                  PURORDDET_ID: item.PURORDDET_ID,
                  PURORD_ID: item.PURORD_ID,
                  QUANTITY: 0,
                  QUARANTINE_FLAG: item.QUARANTINE_FLAG,
                  READY_FOR_RECEIVING_FLAG: item.READY_FOR_RECEIVING_FLAG,
                  USE_ID: "",
                  WORORD_ID: "",
                };
                state.splitDrawer = true;
                state.splitRowQuantity = item.QUANTITY;
                state.splitPostPurcahseDetail.push(splitItem);
                state.splitpurchaseOrderDetails.push(item);
              }
            });
        }
      });
    },
    openPurchaseGridSplitModal(state, action) {
      state.postPurchaseDetail.filter((item) => {
        if (item.PURORDDET_ID == action.payload.PId) {
          const splitItem = {
            CATALOG_NUMBER: item.CATALOGUE_NUMBER,
            COST: item.COST,
            DELETED_FLAG: "N",
            DESCRIPTION: "",
            INVPARLOT_ID: item.INVPARLOT_ID,
            LOT_NUMBER: item.LOT_NUMBER,
            PAR_ID: item.PAR_ID,
            PURORDDET_ID: item.PURORDDET_ID,
            PURORD_ID: item.PURORD_ID,
            QUANTITY: 0,
            QUARANTINE_FLAG: item.QUARANTINE_FLAG,
            READY_FOR_RECEIVING_FLAG: item.READY_FOR_RECEIVING_FLAG,
            USE_ID: "",
            WORORD_ID: "",
          };
          state.splitPurchaseRowQuantity = item.QUANTITY;
          state.splitRowQuantity = item.QUANTITY;
        }
      });
    },

    splitDrawerClose(state, action) {
      state.splitDrawer = false;
      state.splitRowQuantity = 0;
    },

    lotCreateToggle(state, action) {
      state.lotCreate = action.payload;
    },

    splitLotCreateToggle(state, action) {
      state.splitLotCreate = action.payload;
    },

    formSplitCreateToggle(state, action) {
      state.formSplitLotCreate = action.payload;
    },

    onFormSplitLotCraete(state, action) {
      state.formOnSplitLotCreate = action.payload;
    },
    //     updateSubGridCost(state , action){
    // // // console.log('check log for subCost' , action.payload);

    // const purF = state.subData.find((data)=> data.id == action.payload.PurId)
    // const purFPlain = JSON.parse(JSON.stringify(purF));
    // if(purF !== undefined){
    //   const porF = state.purF.find((data)=> data.PURORD_ID == action.payload.PorId)
    //   const porFPlain = JSON.parse(JSON.stringify(porF));

    //   // console.log('check log for subCost' , purFPlain , porFPlain );
    // }

    //     },

    updateSubGridCost(state, action) {
      state.subData = action.payload;
    },

    selectedOrderId(state, action) {
      state.selectedSubOrderId = action.payload;
    },

    deleteRowsInOrder(state, action) {
      const deletedItem = action.payload.items
      state.subData = state.subData.filter((pOrder) => {
        if ((pOrder.id = action.payload.Pid)) {
          // console.log(pOrder,"Order Details")
          pOrder.product ==
            pOrder.product.filter((item) => {
              deletedItem.forEach(del => {
                if (item.PURORDDET_ID == del.rowData.PURORDDET_ID) {
                  item.DELETED_FLAG = "Y"
                }
              });
              return item;
            });
        }
        return pOrder;
      });
    },

    setSubProductId(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.POId) {
          pOrder.product = pOrder.product.map((item) => {
            if (item.PURORDDET_ID === "") {
              item.PURORDDET_ID = action.payload.PId;
            }
            return item; 
          }).filter((filteredItem) => filteredItem); 
        }
        return pOrder;
      });
    },

    setSubNewItem(state, action) {
      state.subData = state.subData.filter((pOrder) => {
        // console.log('action check');

        if (pOrder.id == state.selectedSubOrderId) {
          pOrder.product.push({
            id: pOrder.product.length + 1,
            PURORDDET_ID: "",
            PURORD_ID: state.selectedSubOrderId,
            PAR_ID: action.payload.id.PAR_ID,
            SEQ_NUMBER: 1.0,
            PART_NUMBER: action.payload.id.PAR_CODE,
            NON_STOCK_ITEM_FLAG: action.payload.id.NON_STOCK_ITEM_FLAG,
            PART_DESCRIPTION: action.payload.id.DESCRIPTION,
            SKU_MANUFACTURE: action.payload.id.SKU_MANUFACTURE,
            UPC_MANUFACTURE: action.payload.id.UPC_MANUFACTURE,
            NAME: action.payload.id.NAME,
            BARCODE_NUMBER: action.payload.id.BARCODE_NUMBER,
            QUANTITY: 0,
            UOM_ID_REORDERING: action.payload.id.UOM_ID_REORDERING,
            REORDERING_UOM: null,
            COST: action.payload.id.STANDARD_COST,
            NET_COST: action.payload.id.STANDARD_COST,
            DISCOUNT: "",
            LAST_COST: null,
            QTY_RECEIVED: 0.0,
            COLOR: null,
            READY_FOR_RECEIVING_FLAG: "N",
            CATALOGUE_NUMBER: null,
            PART_COST: action.payload.id.STANDARD_COST,
            QUARANTINE_FLAG: "N",
            CONVERSION_INTO_STOCKING_UOM:
              action.payload.id.CONVERSION_INTO_STOCKING_UOM,
            LOT_NUMBER: null,
            EXPIRY_DATE: null,
            INVPARLOT_ID: null,
            QTY_ONHAND: action.payload.id.OH_QUANTITY,
            QTY_AVAILABLE: 0.0,
            LOT_INITIAL_STATUS: null,
            ISSUED_FLAG: "N",
            RECEIVING_NUMBER: null,
            RECEIVING_DATE: null,
            INVREC_ID: null,
            VENDOR_QUANTITY: 0,
            EXPIRY_DATE_PDF: null,
          });
          return pOrder;
        }
      });
    },
  },
});

export default PurchaseSlices;

export const {
  //search
  subOrderLotChange,
  setSearchData,
  setIsHitApi,
  subOrderQuantityChange,
  //end search
  subOrderDiscChange,
  openSubGridSplitModal,
  splitDrawerClose,
  lotCreateToggle,
  formSplitCreateToggle,
  onFormSplitLotCraete,
  selectedOrderId,
  orderProductUpdate,
  addNewRowSubData,
  SplitsetLotChange,
  subGridStatusUpdate,
  splitLotCreateToggle,
  deleteRowsInOrder,
  loaderToggle,
  setSubProductId,
  //rightDrawer
  setChatData,
  setEditorData,
  setPostLikes,
  addFile,
  //right Drawer end
  openForm,
  subGridset,
  purchaseSku,
  updatePurchaseSku,
  setPurchaseDetails,
  setUpdatePurchaseDetail,
  setUpdatePurchaseOrder,
  updatePurchaseLot,
  setLotList,
  updatePurchaseCost,
  updatePurchaseOrdQnt,
  setProductOrederUpdate,
  NewPurchaseNotes,
  NewPurchaseRef,
  updatePurchaseNotes,
  updatePurchaseRef,
  setNewItem,
  setIssueStatus,
  //  setNewIssueStatus,
  setReadyForRStatus,
  setVender,
  setRefresh,
  setcloseModall,
  openSplitModall,
  SplitsetLot,
  splitAlocatedQnt,
  setNewsplit,
  subGridDelete,
  getFocused,
  newPurchaseOrder,
  newPurchase,
  colseNewModall,
  closeModallForm,
  openNModall,
  onNextFocus,
  onHeadVis,
  setSubGridTotal,
  setsubGridActiveNewitems,
  setVoidStatus,
  updatePurchaseNotesV,
  setSubGridLCostTotal,
  setDiscount,
  setHeadRedux,
  setEditHead,
  setHeadReduxT,
  setMainPurchaseList,
  gridFilter,
  setPageCount,
  setFToT,
  getSearchVal,
  setWarehouse,
  setSelectedVeNid,
  setSelectedWarid,
  setPScreenS,
  setCSvData,
  setSubGridData,
  updateSubGridCost,
  readySubGridPayLoad,
  setAvailableQuantity,
  setSplitPostPurchaseDetail,
  setSplitPostPurchaseDetais,
  decrementAvailableQuantity,
  deleteSplitPostPurchaseDetail,
  setVenid,
  setVenderListFormData,
  clearSplitsGrid,
  clearVenderListFormData,
  setSubNewItem,
  openPurchaseGridSplitModal,
  setPostPurchasePayload,
  setPostIssueStatas,
  setNew,
  updatePurchaseLCost,
  setIsRemoveLot,
  returnReadyForRStatus,
  setSearchQuery,
  setCheckedItemsR,
} = PurchaseSlices.actions;
