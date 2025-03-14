import { createSlice } from "@reduxjs/toolkit";

const stockSlices = createSlice({
  name: "stockSlice",
  initialState: {
    // functions: [],
    pageState: 0,
    formIndex: null,
    checkedItems: [],
    checkedItemsTopModal: [],
    validLocation: false,
    validWarehouse: false,
    isDrawr: false,
    isModal: false,
    colaps: true,
    Refresh: false,
    subPayload: null,
    subData: [],
    CsvData: [],
    wareHouse: [],
    stockOrderList: [],
    mainLoader: false,
    stockOrderFormData: [],
    stockOrderDetailData: [],
    stockOrderFormDataId: null,
    stockOrderDetailDataId: null,
    transferDrawer: false,
    multiTransferDrawer: false,
    assignDrawer: false,
    multiAssignDrawer: false,
    splitDrawer: false,
    SelectedWarid: {},
    LocationsSet: [],
    userList: [],
    LocationSecOptions: [],
    LocationRowOptions: [],
    LocationBinOptions: [],
    splitRowQuantity: 0,
    availableQuantity: 0,
    VenderList: [],
    sessionId: "",
  },
  reducers: {
    setSplitRowQuantity(state, action) {
      state.splitRowQuantity = action.payload;
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
    },
    setAvailableQuantity: (state, action) => {
      state.availableQuantity = action.payload;
    },
    setVender(state, action) {
      state.VenderList = action.payload;
    },
    setNewSplit(state, action) {
      let item = action.payload;
      item = {
        ...item,
        QUANTITY: 0,
        INVSTODET_ID: "",
      };
      state.stockOrderDetailData.push(item);
    },
    setMultiAssignDrawer(state, action) {
      state.multiAssignDrawer = action.payload;
    },
    setSplitDrawer(state, action) {
      state.splitDrawer = action.payload;
    },
    loaderToggle(state, action) {
      state.mainLoader = action.payload;
    },
    setAssignDrawer(state, action) {
      state.assignDrawer = action.payload;
    },
    setLocations(state, action) {
      state.LocationsSet = action.payload.loc;
      state.LocationSecOptions = action.payload.sec;
      state.LocationRowOptions = action.payload.row;
      state.LocationBinOptions = action.payload.bin;
    },
    orderProductUpdate(state, action) {
      state.subData.push(action.payload);
    },
    stockOrderForm(state, action) {
      state.subData = action.payload;
    },
    setUserList(state, action) {
      state.userList = action.payload;
    },
    setOrderIds(state, action) {
      state.stockOrderFormDataId = action.payload.orderId;
      state.stockOrderDetailDataId = action.payload.detailId;
    },
    setStockOrderFormDataId(state, action) {
      state.stockOrderFormDataId = action.payload.orderId;
    },
    setStockOrderDetailDataId(state, action) {
      state.stockOrderDetailDataId = action.payload;
    },
    setMultiOrderIds(state, action) {
      const mainOrder = state.subData.find(
        (item) => item.id == action.payload.id
      );
      state.stockOrderFormData = mainOrder.form;
      if (action.payload.action == "T") {
        const product = mainOrder?.product;
        state.stockOrderDetailData = product.filter((item) => item.WAR_ID == 3909 || item.WAR_ID == 3024);
      } else if (action.payload.action == "A") {
        const product = mainOrder?.product.filter(
          (item) =>
            item.USE_ID_ASSIGNED_TO == null &&
            (item.WAR_ID != 3909 || item.WAR_ID != 3024)
        );
        state.stockOrderDetailData = product;
      } else if (action.payload.action == "SA") {
        state.stockOrderDetailData = action.payload.product;
      } else if (action.payload.action == "ST") {
        state.stockOrderDetailData = action.payload.list;
      }
    },
    setTransferDrawer(state, action) {
      state.transferDrawer = action.payload;
    },
    setMultiTransferDrawer(state, action) {
      state.multiTransferDrawer = action.payload;
    },
    setStockOrderList(state, action) {
      state.stockOrderList = action.payload;
    },
    setWareHouse(state, action) {
      state.wareHouse = action.payload;
    },
    setStockOrderFormData(state, action) {
      state.stockOrderFormData = action.payload;
    },
    setStockOrderDetailData(state, action) {
      state.stockOrderDetailData = action.payload;
    },
    openForm(state, action) {
      state.formIndex = action.payload;
      state.isModal = true;
    },
    setRefresh(state, action) {
      state.Refresh = action.payload;
      state.subPayload = null;
      state.subData = [];
      state.stockOrderDetailData = [];
      state.stockOrderFormData = [];
      state.transferDrawer = false;
      state.multiTransferDrawer = false;
      state.assignDrawer = false;
      state.multiAssignDrawer = false;
      state.SelectedWarid = {};
      state.splitDrawer = false;
      state.selectTransferDrawer = false;
      state.stockOrderDetailDataId = null;
      state.stockOrderFormDataId = null;
      state.LocationsSet = [];
      state.LocationSecOptions = [];
      state.LocationRowOptions = [];
      state.LocationBinOptions = [];
    },
    pushCheckedItems(state, action) {
      if (action.payload.array == "checkedItemsTopModal") {
        state.checkedItemsTopModal.push(action.payload.data);
        return;
      }
      state.checkedItems.push(action.payload);
    },
    unPushCheckItems(state, actions) {
      if (actions.payload.array == "checkedItemsTopModal") {
        state.checkedItemsTopModal = state.checkedItemsTopModal.filter(
          (item) => {
            return item.SKU_MANUFACTURE !== actions.payload.data;
          }
        );
        return;
      }
      state.checkedItems = state.checkedItems.filter((item) => {
        return item.SKU_MANUFACTURE !== actions.payload;
      });
    },
    cleanCheckItems(state, action) {
      state.checkedItems = [];
      state.isModal = false;
    },
    setLocationValid(state, actions) {
      state.validLocation = actions.payload;
    },
    setWarehouse(state, actions) {
      state.validWarehouse = actions.payload;
    },
    openDrawr(state, action) {
      state.isDrawr = action.payload;
    },
    setColapsRedux(state, action) {
      state.colaps = action.payload;
    },
    // setColapsRedux(state, action) {
    //   state.colaps = action.payload;
    // },
    setCSvData(state, action) {
      state.CsvData = action.payload;
    },
    setSelectedWarid(state, action) {
      state.SelectedWarid = action.payload;
    },

    readySubGridPayLoad(state, action) {
      // const findSubOrder = state.subData?.find(
      //   (data) => data.id == action.payload.id
      // );

      // if (findSubOrder) {
      const stockOrderForm = state.stockOrderFormData.map((items) => {
        const {
          INVSTO_ID,
          WAR_ID,
          VEN_ID,
          STOORD_NUMBER,
          STOORD_DATE,
          REFERENCE_NUMBER,
          INVREC_ID,
          SALEORDRET_ID,
          NOTES,
          SUPPLIER_INVOICE_NUMBER,
          USE_ID_PREPARED_BY,
          PREPARED_DATE,
          VOID_FLAG,
          VOID_NOTES,
          FINZ_USE_ID,
          FINAL_DATE,
          SUP_INVOICE_DATE,
          SUP_INVOICE_DUE_DATE,
          TERMS_CONDITION,
          RACK,
          SHELF,
          BIN,
          USE_ID_ASSIGNED_TO,
          ASSIGNED_FLAG,
        } = items;

        return {
          INVSTO_ID,
          WAR_ID,
          VEN_ID,
          STOORD_NUMBER,
          STOORD_DATE,
          REFERENCE_NUMBER,
          INVREC_ID,
          SALEORDRET_ID,
          NOTES,
          SUPPLIER_INVOICE_NUMBER,
          USE_ID_PREPARED_BY,
          PREPARED_DATE,
          VOID_FLAG,
          VOID_NOTES,
          FINZ_USE_ID,
          FINAL_DATE,
          SUP_INVOICE_DATE,
          SUP_INVOICE_DUE_DATE,
          TERMS_CONDITION,
          RACK,
          SHELF,
          BIN,
          USE_ID_ASSIGNED_TO,
          ASSIGNED_FLAG,
        };
      });

      const orderD = stockOrderForm.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
          //newObj.DELETED_FLAG = state.onDeleteRows == false ? "N" : "";
        }
        return newObj;
      });

      const payloadOrder = {
        data: orderD[0],
        method: "PostRecieving",
        action: "InventoryWeb",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      const getorderFilter = state.stockOrderDetailData.map((items) => {
        const {
          INVSTODET_ID,
          INVSTO_ID,
          PAR_ID,
          DESCRIPTION,
          QUANTITY,
          DELETED_FLAG,
          COST,
          WORORD_ID,
          QTY_CONVERSION,
          USE_ID,
          INVRECDET_ID,
          INVPARLOT_ID,
          RACK,
          SHELF,
          BIN,
          WARSTOLOC_ID,
          WAR_ID,
          USE_ID_ASSIGNED_TO,
        } = items;

        return {
          INVSTODET_ID,
          INVSTO_ID,
          PAR_ID,
          DESCRIPTION,
          QUANTITY,
          COST,
          WORORD_ID: WORORD_ID ? WORORD_ID : "",
          CONVERT_QTY: QTY_CONVERSION,
          USE_ID,
          INVRECDET_ID,
          INVPARLOT_ID,
          RACK,
          SHELF,
          BIN,
          WARSTOLOC_ID,
          WAR_ID,
          USE_ID_ASSIGNED_TO: USE_ID_ASSIGNED_TO ? USE_ID_ASSIGNED_TO : "",
          DELETED_FLAG: DELETED_FLAG ? DELETED_FLAG : "N",
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

      const payloadDetail = {
        data: orderF,
        action: "InventoryWeb",
        method: "PostPurchaseOrderDetails",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      state.subPayload = {
        detailPayload: payloadDetail,
        formPayload: payloadOrder,
      };
      // }
    },
    setStockOrder(state, action) {
      state.stockOrderFormData = action.payload.form;
      state.stockOrderDetailData = action.payload.detail;
    },
    updateSubGridSec(state, action) {
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item, index) => {
          if (item.INVSTODET_ID === action.payload.SPId) {
            item.RACK = action.payload.sec;
          } else if (index == action.payload.index) {
            item.RACK = action.payload.sec;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    updateSubGridRow(state, action) {
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item, index) => {
          if (item.INVSTODET_ID === action.payload.SPId) {
            item.SHELF = action.payload.row;
          } else if (index == action.payload.index) {
            item.SHELF = action.payload.row;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    updateSubGridBin(state, action) {
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item, index) => {
          if (item.INVSTODET_ID === action.payload.SPId) {
            item.BIN = action.payload.bin;
          } else if (index == action.payload.index) {
            item.BIN = action.payload.bin;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    updateSubGridQty(state, action) {
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item, index) => {
          if (item.INVSTODET_ID === action.payload.SPId) {
            item.QUANTITY = action.payload.qty;
          } else if (index == action.payload.index) {
            item.QUANTITY = action.payload.qty;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    updateAssignUser(state, action) {
      state.stockOrderDetailData = state.stockOrderDetailData.map((item) => {
        item.USE_ID_ASSIGNED_TO = action.payload;
        return item;
      });
    },
    updateSubGridData(state, action) {
      const mainOrder = state.subData.find(
        (item) => item.id == action.payload.SOId
      );
      let mainProduct = mainOrder?.product.find(
        (item) => item.INVSTODET_ID === action.payload.SPId
      );
      let qtyChange = {};
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item) => {
          if (item.INVSTODET_ID === action.payload.SPId) {
            item.INVSTO_ID = action.payload.SOId;
            item.WAR_ID = state.SelectedWarid.WAR_ID;
            item.WARSTOLOC_ID = action.payload.locId;
            item.USE_ID = "2694";
            qtyChange = item.QUANTITY != mainProduct.QUANTITY ? item : {};
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);

      state.stockOrderFormData = state.stockOrderFormData
        .map((item) => {
          if (item.INVSTO_ID === action.payload.SOId) {
            item.PREPARED_DATE = new Date().toISOString().split("T")[0];
            item.STOORD_DATE = new Date();
            item.FINZ_USE_ID = "2694";
            item.USE_ID_PREPARED_BY = "2694";
            item.VOID_FLAG = "N";
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
      if (Object.keys(qtyChange).length !== 0) {
        mainProduct = {
          ...mainProduct,
          QUANTITY: mainProduct.QUANTITY - qtyChange.QUANTITY,
          INVSTODET_ID: "",
          INVSTO_ID: qtyChange.INVSTO_ID,
        };
        state.stockOrderDetailData.push(mainProduct);
      }

      // console.log(JSON.parse(JSON.stringify(qtyChange)), "qty change")
    },
    updateSplitSubGridData(state, action) {
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item) => {
          item.INVSTO_ID = action.payload.SOId;
          item.USE_ID = "2694";
          return item;
        })
        .filter((filteredItem) => filteredItem);

      state.stockOrderFormData = state.stockOrderFormData
        .map((item) => {
          item.PREPARED_DATE = new Date().toISOString().split("T")[0];
          item.STOORD_DATE = new Date();
          item.FINZ_USE_ID = "2694";
          item.USE_ID_PREPARED_BY = "2694";
          item.VOID_FLAG = "N";
          return item;
        })
        .filter((filteredItem) => filteredItem);

      // console.log(JSON.parse(JSON.stringify(qtyChange)), "qty change")
    },
    updateAllProductData(state, action) {
      const mainOrder = state.subData.find(
        (item) => item.id == action.payload.SOId
      );
      let mainProduct = mainOrder?.product;
      let qtyChange = [];
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item, index) => {
          let currLocation = state.LocationsSet.find(
            (item1) =>
              item1?.SECTION == item.RACK &&
              item1?.ROW == item.SHELF &&
              item1?.BIN == item.BIN
          );
          let locId = currLocation?.WARSTOLOC_ID;
          item.INVSTO_ID = action.payload.SOId;
          item.WAR_ID = state.SelectedWarid.WAR_ID;
          item.WARSTOLOC_ID = locId;
          item.USE_ID = "2694";
          let product = mainProduct.find((Mitem) => Mitem.INVSTODET_ID == item.INVSTODET_ID)
          if (item.QUANTITY !== product.QUANTITY) {
            qtyChange.push(item);
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
      state.stockOrderFormData = state.stockOrderFormData
        .map((item) => {
          item.PREPARED_DATE = new Date().toISOString().split("T")[0];
          item.STOORD_DATE = new Date();
          item.FINZ_USE_ID = "2694";
          item.USE_ID_PREPARED_BY = "2694";
          item.VOID_FLAG = "N";

          return item;
        })
        .filter((filteredItem) => filteredItem);
      if (qtyChange.length !== 0) {
        const updatedMainProduct = mainProduct.map((item) => {
          const matchingQtyChange = qtyChange.find(
            (citem) => citem.INVSTODET_ID === item.INVSTODET_ID
          );
          if (matchingQtyChange) {
            return {
              ...item,
              QUANTITY: item.QUANTITY - matchingQtyChange.QUANTITY,
              INVSTODET_ID: "",
              INVSTO_ID: matchingQtyChange.INVSTO_ID,
            };
          } else {
            return;
          }
        });

        // Filter out undefined items from updatedMainProduct before pushing
        const filteredUpdatedMainProduct = updatedMainProduct.filter(
          (item) => item
        );
        state.stockOrderDetailData.push(...filteredUpdatedMainProduct);
      }
    },
    updatelocations(state, action) {
      if (action.payload.col == "bin") {
        state.stockOrderDetailData = state.stockOrderDetailData
          .map((item, index) => {
            if (item.INVSTODET_ID === action.payload.SPId) {
              item.BIN = action.payload.bin;
              item.WARSTOLOC_ID = action.payload.locId;
            } else if (index == action.payload.index) {
              item.BIN = action.payload.bin;
              item.WARSTOLOC_ID = action.payload.locId;
            }
            return item;
          })
          .filter((filteredItem) => filteredItem);
      } else if (action.payload.col == "sec") {
        state.stockOrderDetailData = state.stockOrderDetailData
          .map((item, index) => {
            if (item.INVSTODET_ID === action.payload.SPId) {
              item.RACK = action.payload.sec;
              item.WARSTOLOC_ID = action.payload.locId;
            } else if (index == action.payload.index) {
              item.RACK = action.payload.sec;
              item.WARSTOLOC_ID = action.payload.locId;
            }
            return item;
          })
          .filter((filteredItem) => filteredItem);
      } else {
        state.stockOrderDetailData = state.stockOrderDetailData
          .map((item, index) => {
            if (item.INVSTODET_ID === action.payload.SPId) {
              item.SHELF = action.payload.row;
              item.WARSTOLOC_ID = action.payload.locId;
            } else if (index == action.payload.index) {
              item.SHELF = action.payload.row;
              item.WARSTOLOC_ID = action.payload.locId;
            }
            return item;
          })
          .filter((filteredItem) => filteredItem);
      }
    },
    updateWarehouseLoc(state, action) {
      state.stockOrderDetailData = state.stockOrderDetailData
        .map((item) => {
          item.SHELF = action.payload;
          item.RACK = action.payload;
          item.BIN = action.payload;
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    setFormData(state, action) {
      if (action.payload.field == "ref") {
        state.subData = [
          {
            ...state.subData[0],
            form: [
              {
                ...state.subData[0].form[0],
                REFERENCE_NUMBER: action.payload.value,
                STOCK_REFERENCE_NUMBER: action.payload.value,
              },
            ],
          },
        ];
      } else {
        state.subData = [
          {
            ...state.subData[0],
            form: [
              {
                ...state.subData[0].form[0],
                NOTES: action.payload.value,
                STOCK_NOTES: action.payload.value,
              },
            ],
          },
        ];
      }
    },
  },
});

export default stockSlices;

export const { openForm } = stockSlices.actions;
export const {
  setFormData,
  pushCheckedItems,
  unPushCheckItems,
  cleanCheckItems,
  setLocationValid,
  setWarehouse,
  openDrawr,
  setColapsRedux,
  setRefresh,
  setCSvData,
  loaderToggle,
  setWareHouse,
  setStockOrderList,
  setStockOrderFormData,
  setStockOrderDetailData,
  setTransferDrawer,
  setSelectedWarid,
  readySubGridPayLoad,
  setOrderIds,
  orderProductUpdate,
  setLocations,
  updateSubGridSec,
  updateSubGridRow,
  updateSubGridBin,
  updateSubGridQty,
  updateSubGridData,
  setMultiTransferDrawer,
  setMultiOrderIds,
  updateAllProductData,
  setStockOrder,
  setAssignDrawer,
  setUserList,
  updateAssignUser,
  setMultiAssignDrawer,
  setSplitDrawer,
  setSplitRowQuantity,
  setNewSplit,
  setAvailableQuantity,
  stockOrderForm,
  setVender,
  setStockOrderFormDataId,
  updatelocations,
  updateSplitSubGridData,
  updateWarehouseLoc,
  setStockOrderDetailDataId,
  setSessionId,
} = stockSlices.actions;
