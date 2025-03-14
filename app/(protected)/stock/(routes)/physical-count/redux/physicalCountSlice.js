import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const physicalCountSlices = createSlice({
  name: "physicalCountSlice",
  initialState: {
    newModal: false,
    PCIndex: null,
    PCModal: false,
    PCList: [],
    LocationsSet: [],
    LocationSecOptions: [],
    LocationRowOptions: [],
    LocationBinOptions: [],
    SelectedWarid: {},
    wareHouse: [],
    physicalCountForm: [],
    physicalCountDetails: [],
    mainLoader: false,
    refresh: false,
    userList: [],
    subPayload: {},
    newFormPayload: {},
    newDetailPayload: {},
    newSModal: false,
    isModalOpen: false,
    verifyCodeModal: false,
    partList: [],
    LotList: [],
    CsvData: [],
    sessionId: "",
    subData: [],
    assignDrawer: false,
  },
  reducers: {
    setCSvData(state, action) {
      state.CsvData = action.payload;
    },
    setAssignDrawer(state, action){
      state.assignDrawer = action.payload;
    },
    orderProductUpdate(state, action) {
      const orderData = {
        id: action.payload.id,
        product: action.payload.product,
        form: state.physicalCountForm,
      };
      state.subData.push(orderData);
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
    },
    setPCList(state, action) {
      state.PCList = action.payload;
    },
    setLotList(state, action) {
      state.LotList = action.payload;
    },
    setPartList(state, action) {
      state.partList = action.payload;
    },
    setVerifyCodeModal(state, action) {
      state.verifyCodeModal = action.payload;
    },
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setNewModal(state, action) {
      state.newModal = action.payload;
    },
    setNewSModal(state, action) {
      state.newSModal = action.payload;
    },
    setPCIndex(state, action) {
      state.PCIndex = action.payload;
      // state.PCModal = true;
    },
    setPCModal(state, action) {
      state.PCModal = action.payload;
    },
    setLocations(state, action) {
      state.LocationsSet = action.payload.loc;
      state.LocationSecOptions = action.payload.sec;
      state.LocationRowOptions = action.payload.row;
      state.LocationBinOptions = action.payload.bin;
    },
    setSelectedWarid(state, action) {
      state.SelectedWarid = action.payload;
    },
    setWareHouse(state, action) {
      state.wareHouse = action.payload;
    },
    setPhysicalCountForm(state, action) {
      state.physicalCountForm = action.payload;
    },
    setPhysicalCountDetails(state, action) {
      state.physicalCountDetails = action.payload;
    },
    setLoader(state, action) {
      state.mainLoader = action.payload;
    },
    setRefresh(state, action) {
      state.refresh = action.payload;
      state.subData = [];
      state.assignDrawer = false;
      state.subPayload = null;
    },
    setUsers(state, action) {
      state.userList = action.payload;
    },
    updateVoid(state, action){
      state.physicalCountForm = state.physicalCountForm
        .map((item) => {
          item.VOID_FLAG = "Y";
          item.VOID_NOTES = action.payload;
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    readySubGridPayLoad(state, action) {
      const physicalForm = state.physicalCountForm.map((items) => {
        const {
          APPROVED_FLAG,
          CYCLE_COUNT_FLAG,
          FINILIZE_TYPE,
          INCLUDE_EXPIRED_FLAG,
          LOCATION_BLANK_FLAG,
          NON_STOCK_ITMES_FLAG,
          NOTES,
          ONHAND_BLANK_FLAG,
          PC_DATE,
          PHYCOU_ID,
          USE_ID_ASSIGNED_TO,
          VOID_FLAG,
          VOID_NOTES,
          WAR_ID,
          FINALIZED_FLAG,
        } = items;

        return {
          APPROVED_FLAG,
          ASOF_DATE: "22/11/2021",
          CYCLE_COUNT_FLAG: "N",
          DESCRIPTION: NOTES,
          EXCLUDE_EMPTY: "Y",
          FINILIZE_TYPE: "EXCLUDE_BLANKS",
          FINZ_FLAG: FINALIZED_FLAG,
          FINZ_USE_ID: "2694",
          INCLUDE_EXPIRED_FLAG,
          LOCATION_BLANK_FLAG,
          NON_STOCK_ITMES_FLAG: "N",
          NOTES,
          ONHAND_BLANK_FLAG,
          PC_DATE: moment(PC_DATE).format("DD / MM / YYYY"),
          PHYCOU_ID,
          USE_ID_APPROVED_BY: "2694",
          USE_ID_ASSIGNED_TO: USE_ID_ASSIGNED_TO ? USE_ID_ASSIGNED_TO : "",
          USE_ID_PREPARED_BY: "2694",
          VOID_FLAG,
          VOID_NOTES: VOID_NOTES ? VOID_NOTES : "",
          WAR_ID,
        };
      });

      const PCForm = physicalForm.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
          //newObj.DELETED_FLAG = state.onDeleteRows == false ? "N" : "";
        }
        return newObj;
      });

      const payloadOrder = {
        data: PCForm[0],
        method: "PostPhysicalCount",
        password: "1234",
        action: "InventoryWeb",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      const physicalDetail = state.physicalCountDetails.map((items) => {
        const {
          COUNT_QTY,
          DELETE_FLAG,
          INVPARLOT_ID,
          MAX_QTY,
          MIN_QTY,
          PAR_ID,
          PHYCOU_ID,
          PHYCOUDET_ID,
          ROW_NUMBER,
          ROW_NUMBER_2,
          SECTIIN,
          SECTION_2,
          SHELF,
          SHELF_2,
          USE_ID,
          WARSTOLOC_ID,
          WAR_ID,
          BIN_NUMBER,
          SECTION,
        } = items;

        return {
          BIN: BIN_NUMBER,
          BIN_2: "",
          COUNT_QTY,
          DELETE_FLAG: "N",
          INVPARLOT_ID,
          MAX_QTY: "100",
          MIN_QTY: "1",
          PAR_ID,
          PHYCOU_ID,
          PHYCUODET_ID: PHYCOUDET_ID,
          ROW_NUMBER,
          ROW_NUMBER_2: "",
          SECTIIN: SECTION,
          SECTION_2: "",
          SHELF: SECTION,
          SHELF_2: "",
          USE_ID: "2694",
          WARSTOLOC_ID,
          WAR_ID: state.physicalCountForm[0].WAR_ID,
        };
      });

      const PCDetail = physicalDetail.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadDetail = {
        data: PCDetail,
        action: "InventoryWeb",
        method: "PostPhysicalCountDetail",
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
    setNewForm(state, action) {
      state.physicalCountForm = [
        {
          APPROVED_FLAG: "N",
          ASOF_DATE: "22/11/2021",
          CYCLE_COUNT_FLAG: "N",
          DESCRIPTION: "",
          EXCLUDE_EMPTY: "Y",
          FINILIZE_TYPE: "EXCLUDE_BLANKS",
          FINZ_FLAG: "N",
          FINZ_USE_ID: "2694",
          INCLUDE_EXPIRED_FLAG: "N",
          LOCATION_BLANK_FLAG: "N",
          NON_STOCK_ITMES_FLAG: "N",
          NOTES: "",
          ONHAND_BLANK_FLAG: "N",
          PC_DATE: moment(new Date()).format("DD / MM / YYYY"),
          PHYCOU_ID: "",
          USE_ID_APPROVED_BY: "2694",
          USE_ID_ASSIGNED_TO: "",
          USE_ID_PREPARED_BY: "2694",
          VOID_FLAG: "",
          VOID_NOTES: "",
          WAR_ID: "",
        },
      ];
    },
    newFormPayload(state, action) {
      const physicalForm = state.physicalCountForm.map((items) => {
        const {
          APPROVED_FLAG,
          ASOF_DATE,
          CYCLE_COUNT_FLAG,
          DESCRIPTION,
          EXCLUDE_EMPTY,
          FINILIZE_TYPE,
          FINZ_FLAG,
          FINZ_USE_ID,
          INCLUDE_EXPIRED_FLAG,
          LOCATION_BLANK_FLAG,
          NON_STOCK_ITMES_FLAG,
          NOTES,
          ONHAND_BLANK_FLAG,
          PC_DATE,
          PHYCOU_ID,
          USE_ID_APPROVED_BY,
          USE_ID_ASSIGNED_TO,
          USE_ID_PREPARED_BY,
          VOID_FLAG,
          VOID_NOTES,
        } = items;

        return {
          APPROVED_FLAG,
          ASOF_DATE,
          CYCLE_COUNT_FLAG,
          DESCRIPTION,
          EXCLUDE_EMPTY,
          FINILIZE_TYPE,
          FINZ_FLAG,
          FINZ_USE_ID,
          INCLUDE_EXPIRED_FLAG,
          LOCATION_BLANK_FLAG,
          NON_STOCK_ITMES_FLAG,
          NOTES,
          ONHAND_BLANK_FLAG,
          PC_DATE,
          PHYCOU_ID,
          USE_ID_APPROVED_BY,
          USE_ID_ASSIGNED_TO,
          USE_ID_PREPARED_BY,
          VOID_FLAG,
          VOID_NOTES,
          WAR_ID: state.SelectedWarid.WAR_ID,
        };
      });

      const PCForm = physicalForm.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
          //newObj.DELETED_FLAG = state.onDeleteRows == false ? "N" : "";
        }
        return newObj;
      });

      const payloadOrder = {
        data: PCForm[0],
        method: "PostPhysicalCount",
        password: "1234",
        action: "InventoryWeb",
        tid: "144",
        type: "rpc",
        username: "admin",
      };
      state.newFormPayload = payloadOrder;
    },
    newDetailPayload(state, action) {
      const physicalDetail = state.physicalCountDetails.map((items) => {
        const {
          COUNT_QTY,
          INVPARLOT_ID,
          PAR_ID,
          PHYCOU_ID,
          WARSTOLOC_ID,
          BIN_NUMBER,
          SECTION,
          SHELF,
        } = items;

        return {
          BIN: BIN_NUMBER,
          BIN_2: "",
          COUNT_QTY: null,
          DELETE_FLAG: "N",
          INVPARLOT_ID,
          MAX_QTY: "100",
          MIN_QTY: "1",
          PAR_ID,
          PHYCOU_ID: action.payload,
          PHYCUODET_ID: "",
          ROW_NUMBER: SHELF,
          ROW_NUMBER_2: "",
          SECTIIN: SECTION,
          SECTION_2: "",
          SHELF: SECTION,
          SHELF_2: "",
          USE_ID: "2694",
          WARSTOLOC_ID,
          WAR_ID: state.SelectedWarid.WAR_ID,
        };
      });

      const PCDetail = physicalDetail.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadDetail = {
        data: PCDetail,
        action: "InventoryWeb",
        method: "PostPhysicalCountDetail",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      state.newDetailPayload = payloadDetail;
    },
    setSubPayload(state, action) {
      state.subPayload = {};
      state.physicalCountForm = [];
      state.physicalCountDetails = [];
    },
    UpdateUserId(state, action) {
      state.physicalCountForm = state.physicalCountForm
        .map((item) => {
          item.USE_ID_ASSIGNED_TO = action.payload;
          item.APPROVED_FLAG = "Y";
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    updateNotes(state, action) {
      state.physicalCountForm = state.physicalCountForm
        .map((item) => {
          item.NOTES = action.payload;
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    updatePCId(state, action) {
      state.physicalCountForm = state.physicalCountForm
        .map((item) => {
          item.PHYCOU_ID = action.payload;
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    updatePCEmpty(state, action) {
      state.physicalCountForm = state.physicalCountForm
        .map((item) => {
          item.ONHAND_BLANK_FLAG = action.payload.oh;
          item.EXCLUDE_EMPTY = action.payload.ee;
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateQty(state, action) {
      state.physicalCountDetails = state.physicalCountDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            item.COUNT_QTY = action.payload.qty;
            if (item.ONHAND_QTY < action.payload.qty) {
              item.ADJUSTMENT = action.payload.qty - item.ONHAND_QTY;
            }
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateBin(state, action) {
      state.physicalCountDetails = state.physicalCountDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            let currLocation = state.LocationsSet.find(
              (item1) =>
                item1?.SECTION == item.SECTION &&
                item1?.ROW == item.ROW_NUMBER &&
                item1?.BIN == item.BIN_NUMBER
            );
            let locId = currLocation?.WARSTOLOC_ID;
            item.BIN_NUMBER = action.payload.bin;
            item.WARSTOLOC_ID = locId;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateSec(state, action) {
      state.physicalCountDetails = state.physicalCountDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            let currLocation = state.LocationsSet.find(
              (item1) =>
                item1?.SECTION == item.SECTION &&
                item1?.ROW == item.ROW_NUMBER &&
                item1?.BIN == item.BIN_NUMBER
            );
            let locId = currLocation?.WARSTOLOC_ID;
            item.SECTION = action.payload.bin;
            item.WARSTOLOC_ID = locId;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateRow(state, action) {
      state.physicalCountDetails = state.physicalCountDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            let currLocation = state.LocationsSet.find(
              (item1) =>
                item1?.SECTION == item.SECTION &&
                item1?.ROW == item.ROW_NUMBER &&
                item1?.BIN == item.BIN_NUMBER
            );
            let locId = currLocation?.WARSTOLOC_ID;
            item.ROW_NUMBER = action.payload.bin;
            item.WARSTOLOC_ID = locId;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateSku(state, action) {
      state.physicalCountDetails = state.physicalCountDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            item.PART_NUMBER = action.payload.PC;
            item.SKU_MANUFACTURE = action.payload.SM;
            item.PAR_ID = action.payload.PI;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateLot(state, action) {
      state.physicalCountDetails = state.physicalCountDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            item.LOT_NUMBER = action.payload.LN;
            item.EXPIRY_DATE = action.payload.ED;
            item.INVPARLOT_ID = action.payload.LI;
            item.ONHAND_QTY = action.payload.OH;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    splitRow(state, action) {
      const index = state.physicalCountDetails.findIndex(
        (item) => item.PHYCOUDET_ID === action.payload
      );

      if (index !== -1) {
        const newItem = {
          ...state.physicalCountDetails[index],
          PHYCOUDET_ID: "",
          PART_NUMBER: "",
          SKU_MANUFACTURE: "",
          ONHAND_QTY: "",
          LOT_NUMBER: "",
          EXPIRY_DATE: "",
          COUNT_QTY: "",
          ADJUSTMENT: "",
        };
        state.physicalCountDetails.splice(index + 1, 0, newItem);
      }
    },
    readyGridPayLoad(state, action) {
      const findSubOrder = state.subData?.find(
        (data) => data.id == action.payload.id
      );

      if (findSubOrder) {
        const physicalForm = findSubOrder.form.map((items) => {
          const {
            APPROVED_FLAG,
            INCLUDE_EXPIRED_FLAG,
            LOCATION_BLANK_FLAG,
            NOTES,
            ONHAND_BLANK_FLAG,
            PC_DATE,
            PHYCOU_ID,
            USE_ID_ASSIGNED_TO,
            VOID_FLAG,
            VOID_NOTES,
            WAR_ID,
            FINALIZED_FLAG,
          } = items;

          return {
            APPROVED_FLAG,
            ASOF_DATE: "22/11/2021",
            CYCLE_COUNT_FLAG: "N",
            DESCRIPTION: NOTES ? NOTES : "",
            EXCLUDE_EMPTY: "Y",
            FINILIZE_TYPE: "EXCLUDE_BLANKS",
            FINZ_FLAG: FINALIZED_FLAG,
            FINZ_USE_ID: "2694",
            INCLUDE_EXPIRED_FLAG,
            LOCATION_BLANK_FLAG,
            NON_STOCK_ITMES_FLAG: "N",
            NOTES: NOTES ? NOTES : "",
            ONHAND_BLANK_FLAG,
            PC_DATE: moment(PC_DATE).format("DD / MM / YYYY"),
            PHYCOU_ID,
            USE_ID_APPROVED_BY: "2694",
            USE_ID_ASSIGNED_TO: USE_ID_ASSIGNED_TO ? USE_ID_ASSIGNED_TO : "",
            USE_ID_PREPARED_BY: "2694",
            VOID_FLAG: "",
            VOID_NOTES: VOID_NOTES ? VOID_NOTES : "",
            WAR_ID,
          };
        });

        const PCForm = physicalForm.map((obj) => {
          // Iterate through each property of the object
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
            //newObj.DELETED_FLAG = state.onDeleteRows == false ? "N" : "";
          }
          return newObj;
        });

        const payloadOrder = {
          data: PCForm[0],
          method: "PostPhysicalCount",
          password: "1234",
          action: "InventoryWeb",
          tid: "144",
          type: "rpc",
          username: "admin",
        };

        const physicalDetail = findSubOrder.product.map((items) => {
          const {
            COUNT_QTY,
            INVPARLOT_ID,
            PAR_ID,
            PHYCOU_ID,
            PHYCOUDET_ID,
            ROW_NUMBER,
            WARSTOLOC_ID,
            BIN_NUMBER,
            SECTION,
          } = items;

          return {
            BIN: BIN_NUMBER,
            BIN_2: "",
            COUNT_QTY,
            DELETE_FLAG: "N",
            INVPARLOT_ID,
            MAX_QTY: "100",
            MIN_QTY: "1",
            PAR_ID,
            PHYCOU_ID,
            PHYCUODET_ID: PHYCOUDET_ID,
            ROW_NUMBER,
            ROW_NUMBER_2: "",
            SECTIIN: SECTION,
            SECTION_2: "",
            SHELF: SECTION,
            SHELF_2: "",
            USE_ID: "2694",
            WARSTOLOC_ID,
            WAR_ID: findSubOrder.form[0].WAR_ID,
          };
        });

        const PCDetail = physicalDetail.map((obj) => {
          // Iterate through each property of the object
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
          }
          return newObj;
        });

        const payloadDetail = {
          data: PCDetail,
          action: "InventoryWeb",
          method: "PostPhysicalCountDetail",
          tid: "144",
          type: "rpc",
          username: "admin",
        };

        state.subPayload = {
          detailPayload: payloadDetail,
          formPayload: payloadOrder,
        };
      }
    },
    UpdateSubBin(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index == action.payload.ind) {
                let currLocation = state.LocationsSet.find(
                  (item1) =>
                    item1?.SECTION == item.SECTION &&
                    item1?.ROW == item.ROW_NUMBER &&
                    item1?.BIN == item.BIN_NUMBER
                );
                let locId = currLocation?.WARSTOLOC_ID;
                item.BIN_NUMBER = action.payload.bin;
                item.WARSTOLOC_ID = locId;
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubSec(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index == action.payload.ind) {
                let currLocation = state.LocationsSet.find(
                  (item1) =>
                    item1?.SECTION == item.SECTION &&
                    item1?.ROW == item.ROW_NUMBER &&
                    item1?.BIN == item.BIN_NUMBER
                );
                let locId = currLocation?.WARSTOLOC_ID;
                item.SECTION = action.payload.bin;
                item.WARSTOLOC_ID = locId;
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubRow(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index == action.payload.ind) {
                let currLocation = state.LocationsSet.find(
                  (item1) =>
                    item1?.SECTION == item.SECTION &&
                    item1?.ROW == item.ROW_NUMBER &&
                    item1?.BIN == item.BIN_NUMBER
                );
                let locId = currLocation?.WARSTOLOC_ID;
                item.ROW_NUMBER = action.payload.bin;
                item.WARSTOLOC_ID = locId;
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubQty(state, action) {
      console.log(action.payload, "check")
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index == action.payload.ind) {
                item.COUNT_QTY = action.payload.bin;
                if (item.ONHAND_QTY < action.payload.bin) {
                  item.ADJUSTMENT = action.payload.bin - item.ONHAND_QTY;
                }
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubSku(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index == action.payload.ind) {
                item.PART_NUMBER = action.payload.PC;
                item.SKU_MANUFACTURE = action.payload.SM;
                item.PAR_ID = action.payload.PI;
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubLot(state, action) {
        state.subData = state.subData.map((pOrder) => {
          if (pOrder.id === action.payload.PId) {
            pOrder.product = pOrder.product
              .map((item, index) => {
                if (index == action.payload.ind) {
                  item.LOT_NUMBER = action.payload.LN;
                  item.EXPIRY_DATE = action.payload.ED;
                  item.INVPARLOT_ID = action.payload.LI;
                  item.ONHAND_QTY = action.payload.OH;
                }
                return item;
              })
              .filter((filteredItem) => filteredItem);
          }
          return pOrder;
        });
    },
    UpdateSubSplit(state, action) {
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PID) {
          const index = pOrder.product.findIndex(
            (item) => item.PHYCOUDET_ID === action.payload.RID
          );
          if (index !== -1) {
            const newItem = {
              ...pOrder.product[index],
              PHYCOUDET_ID: "",
              PART_NUMBER: "",
              SKU_MANUFACTURE: "",
              ONHAND_QTY: "",
              LOT_NUMBER: "",
              EXPIRY_DATE: "",
              COUNT_QTY: "",
              ADJUSTMENT: "",
            };
            pOrder.product.splice(index + 1, 0, newItem);
          }
        }
        return pOrder;
      });
    },
  },
});

export default physicalCountSlices;
export const {
  setNewModal,
  setPCIndex,
  setPCModal,
  setLocations,
  setSelectedWarid,
  setWareHouse,
  setPhysicalCountForm,
  setPhysicalCountDetails,
  setLoader,
  setRefresh,
  setUsers,
  UpdateUserId,
  UpdateQty,
  updateNotes,
  readySubGridPayLoad,
  setSubPayload,
  UpdateBin,
  UpdateSec,
  UpdateRow,
  newDetailPayload,
  newFormPayload,
  updatePCId,
  setNewForm,
  setNewSModal,
  setIsModalOpen,
  setVerifyCodeModal,
  updatePCEmpty,
  splitRow,
  setPartList,
  UpdateSku,
  setLotList,
  UpdateLot,
  setPCList,
  setCSvData,
  setSessionId,
  orderProductUpdate,
  readyGridPayLoad,
  UpdateSubBin,
  UpdateSubSec,
  UpdateSubRow,
  UpdateSubQty,
  UpdateSubSplit,
  UpdateSubSku,
  UpdateSubLot,
  setAssignDrawer,
  updateVoid,
} = physicalCountSlices.actions;
