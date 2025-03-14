import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const TransferSlice = createSlice({
  name: "TransferSlice",
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
    voidNotes: {},
    wareHouse: [],
    killSession: true,
    TransferForm: [],
    transferDetails: [],
    mainLoader: false,
    refresh: false,
    reporting: false,
    userList: [],
    subPayload: {},
    voidPayload: {},
    newFormPayload: {},
    newDetailPayload: {},
    isModalOpen: false,
    verifyCodeModal: false,
    partList: [],
    LotList: [],
    CsvData: [],
    sessionId: "",
    subData: [],
    assignDrawer: false,
    transferList: [],
    ohHide: false,
  },
  reducers: {
    setReporting(state, action) {
      state.reporting = action.payload;
    },
    setTransferList(state, action) {
      state.transferList = action.payload;
    },
    setCSvData(state, action) {
      state.CsvData = action.payload;
    },
    setAssignDrawer(state, action) {
      state.assignDrawer = action.payload;
    },
    setKillSession(state, action) {
      state.killSession = action.payload;
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
    setPCIndex(state, action) {
      state.PCIndex = action.payload;
      // state.PCModal = true;
    },
    setPCModal(state, action) {
      state.PCModal = action.payload;
    },
    setLocations(state, action) {
      // const { loc, sec, row, bin } = action.payload;
      // // Find the index where loc exists in LocationsSet
      // const index = state.LocationsSet.findIndex((item) => item === loc);
      // if (index !== -1) {
      //   // Update existing entries at the found index
      //   state.LocationSecOptions[index] = sec;
      //   state.LocationRowOptions[index] = row;
      //   state.LocationBinOptions[index] = bin;
      // } else {
      //   // If loc does not exist, push new entries
      //   state.LocationsSet.push(loc);
      //   state.LocationSecOptions.push(sec);
      //   state.LocationRowOptions.push(row);
      //   state.LocationBinOptions.push(bin);
      // }
      // const { ind, loc, sec, row, bin } = action.payload;
      // // Create copies of the arrays to update
      // const newLocationsSet = [...state.LocationsSet];
      // const newLocationSecOptions = [...state.LocationSecOptions];
      // const newLocationRowOptions = [...state.LocationRowOptions];
      // const newLocationBinOptions = [...state.LocationBinOptions];
      // // Update the specific elements at the given index
      // if (ind >= 0 && ind < state.LocationsSet.length) {
      //   newLocationsSet[ind] = loc;
      //   newLocationSecOptions[ind] = sec;
      //   newLocationRowOptions[ind] = row;
      //   newLocationBinOptions[ind] = bin;
      // }
      // state.LocationsSet.push(action.payload.loc);
      // state.LocationSecOptions.push(action.payload.sec);
      // state.LocationRowOptions.push(action.payload.sec);
      // state.LocationBinOptions.push(action.payload.sec);
      // return state;
      // const newLocationsSet = [...state.LocationsSet, action.payload.loc];
      // const newLocationSecOptions = [
      //   ...state.LocationSecOptions,
      //   action.payload.sec,
      // ];
      // const newLocationRowOptions = [
      //   ...state.LocationRowOptions,
      //   action.payload.row,
      // ];
      // const newLocationBinOptions = [
      //   ...state.LocationBinOptions,
      //   action.payload.bin,
      // ];
      // return {
      //   ...state,
      //   LocationsSet: newLocationsSet,
      //   LocationSecOptions: newLocationSecOptions,
      //   LocationRowOptions: newLocationRowOptions,
      //   LocationBinOptions: newLocationBinOptions,
      // };
      state.LocationsSet = {
        ...state.LocationsSet,
        [action.payload.ind]: action.payload.loc,
      };
      state.LocationSecOptions = {
        ...state.LocationSecOptions,
        [action.payload.ind]: action.payload.sec,
      };
      state.LocationRowOptions = {
        ...state.LocationRowOptions,
        [action.payload.ind]: action.payload.row,
      };
      state.LocationBinOptions = {
        ...state.LocationBinOptions,
        [action.payload.ind]: action.payload.bin,
      };
    },

    setSelectedWarid(state, action) {
      state.SelectedWarid = action.payload;
    },
    setWareHouse(state, action) {
      state.wareHouse = action.payload;
    },
    setTransferForm(state, action) {
      state.TransferForm = action.payload;
    },
    setLoader(state, action) {
      state.mainLoader = action.payload;
    },

    setRefresh(state, action) {
      state.LocationsSet = [];
      state.LocationBinOptions = [];
      state.LocationRowOptions = [];
      state.LocationSecOptions = [];
      state.TransferForm = [];
      state.transferDetails = [];
      state.refresh = action.payload;
      state.sessionId = "";
      state.subData = [];
      state.assignDrawer = false;
      state.subPayload = null;
    },
    setUsers(state, action) {
      state.userList = action.payload;
    },
    updateVoid(state, action) {
      state.TransferForm = state.TransferForm.map((item) => {
        item.VOID_FLAG = "Y";
        item.VOID_NOTES = action.payload;
        (item.USE_ID_PREPARED_BY = ""), (item.FINZ_FLAG = "");
        return item;
      }).filter((filteredItem) => filteredItem);
    },

    setTransferDetails(state, action) {
      state.transferDetails = action.payload;
    },
    addTransferDetails(state, action) {
      const combine = action.payload.map((item) => ({
        ...item,
        INVENTORY_FROM: state.SelectedWarid.WAREHOUSE,
        war_id_to: "",
        INVENTORY_TO: "",
        SHELF_TO_LOC: "",
        RACK_TO_LOC: "",
        BIN_NUMBER_TO_LOC: "",
        QUANTITY: "",
        ADJUSTMENT: "",
        WARSTOLOC_ID_TO: "",
      }));
      state.transferDetails = [...state.transferDetails, ...combine];
    },
    newDetailPayload(state, action) {
      const transferDetail = state.transferDetails.map((items, index) => {
        const {
          INVTRA_DETAIL_ID,
          INVTRA_ID,
          PAR_ID,
          QUANTITY,
          DELETE_FLAG,
          INVPARLOT_ID,
          WARSTOLOC_ID_FROM,
          WARSTOLOC_ID_TO,
          USE_ID_ASSIGNED_TO,
          WORORD_ID,
          USE_ID,
          war_id_to,
          WAR_ID_FROM,
        } = items;

        return {
          INVTRA_DETAIL_ID,
          INVTRA_ID,
          PAR_ID,
          QUANTITY,
          DELETE_FLAG,
          INVPARLOT_ID,
          WARSTOLOC_ID_FROM: state.transferDetails[index].WARSTOLOC_ID,
          WARSTOLOC_ID_TO,
          USE_ID_ASSIGNED_TO,
          WORORD_ID,
          USE_ID: "2694",
          war_id_to,
          WAR_ID_FROM: state.SelectedWarid.WAR_ID,
        };
      });

      const TCDetail = transferDetail.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadDetail = {
        data: TCDetail,
        action: "InventoryWeb",
        method: "PostInventoryTransferDetails",
        username: "admin",
        type: "rpc",
        tid: "144",
      };

      state.newDetailPayload = payloadDetail;
    },
    setNewForm(state, action) {
      state.TransferForm = [
        {
          INVTRA_ID: "",
          WAR_ID_FROM: "",
          WAR_ID_TO: "",
          TRANSFER_ASOF_DATE: "",
          TRANSFER_DATE: moment(new Date()).format("DD / MM / YYYY"),
          DESCRIPTION: "",
          NOTES: "",
          USE_ID_PREPARED_BY: "2694",
          FINZ_FLAG: "",
          FINZ_USE_ID: "",
          VOID_FLAG: "",
          VOID_NOTES: "N",
          TRANSFER_BY_SKU_FLAG: "Y",
          APPROVED_FLAG: "Y",
          USE_ID_APPROVED_BY: "1",
          READY_FOR_DELIVERY: "",
        },
      ];
    },
    newFormPayload(state, action) {
      const transferForm = state.TransferForm.map((items) => {
        const {
          INVTRA_ID,
          WAR_ID_FROM,
          WAR_ID_TO,
          TRANSFER_ASOF_DATE,
          TRANSFER_DATE,
          DESCRIPTION,
          NOTES,
          USE_ID_PREPARED_BY,
          FINZ_FLAG,
          FINZ_USE_ID,
          VOID_FLAG,
          VOID_NOTES,
          TRANSFER_BY_SKU_FLAG,
          APPROVED_FLAG,
          USE_ID_APPROVED_BY,
          READY_FOR_DELIVERY,
        } = items;

        return {
          INVTRA_ID,
          WAR_ID_TO,
          WAR_ID_FROM,
          TRANSFER_ASOF_DATE,
          TRANSFER_DATE,
          DESCRIPTION,
          NOTES,
          USE_ID_PREPARED_BY,
          FINZ_FLAG,
          FINZ_USE_ID,
          VOID_FLAG,
          VOID_NOTES,
          TRANSFER_BY_SKU_FLAG,
          APPROVED_FLAG,
          USE_ID_APPROVED_BY,
          READY_FOR_DELIVERY,
        };
      });

      const TCForm = transferForm.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadOrder = {
        data: TCForm[0],
        action: "InventoryWeb",
        method: "PostInventoryTransfer",
        username: "admin",
        type: "rpc",
        tid: "144",
      };
      state.newFormPayload = payloadOrder;
    },
    readySubGridPayLoad(state, action) {
      const transferForm = state.TransferForm.map((items) => {
        const {
          INVTRA_ID,
          WAR_ID_FROM,
          WAR_ID_TO,
          TRANSFER_ASOF_DATE,
          TRANSFER_DATE,
          DESCRIPTION,
          NOTES,
          USE_ID_PREPARED_BY,
          FINZ_FLAG,
          FINZ_USE_ID,
          VOID_FLAG,
          VOID_NOTES,
          TRANSFER_BY_SKU_FLAG,
          APPROVED_FLAG,
          USE_ID_APPROVED_BY,
          READY_FOR_DELIVERY,
        } = items;

        return {
          INVTRA_ID,
          WAR_ID_TO,
          WAR_ID_FROM,
          TRANSFER_ASOF_DATE,
          TRANSFER_DATE,
          DESCRIPTION,
          NOTES,
          USE_ID_PREPARED_BY: "2694",
          FINZ_FLAG: "Y",
          FINZ_USE_ID: "2694",
          VOID_FLAG: "N",
          VOID_NOTES,
          TRANSFER_BY_SKU_FLAG: "Y",
          APPROVED_FLAG: "Y",
          USE_ID_APPROVED_BY: "1",
          READY_FOR_DELIVERY,
        };
      });

      const TCForm = transferForm.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadOrder = {
        data: TCForm[0],
        method: "PostTransfer",
        password: "1234",
        action: "InventoryWeb",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      const transferDetail = state.transferDetails.map((items, index) => {
        const {
          INVTRA_DETAIL_ID,
          INVTRA_ID,
          PAR_ID,
          QUANTITY,
          DELETE_FLAG,
          INVPARLOT_ID,
          WARSTOLOC_ID_FROM,
          WARSTOLOC_ID_TO,
          USE_ID_ASSIGNED_TO,
          WORORD_ID,
          USE_ID,
          WAR_ID_TO,
          WAR_ID_FROM,
        } = items;

        return {
          INVTRA_DETAIL_ID: state.transferDetails[index].INVTRADET_ID,
          INVTRA_ID,
          PAR_ID,
          QUANTITY,
          DELETE_FLAG: "N",
          INVPARLOT_ID,
          WARSTOLOC_ID_FROM,
          WARSTOLOC_ID_TO,
          USE_ID_ASSIGNED_TO,
          WORORD_ID,
          USE_ID: "2694",
          WAR_ID_TO: state.transferDetails[index].war_id_to,
          WAR_ID_FROM,
        };
      });

      const TCDetail = transferDetail.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadDetail = {
        data: TCDetail,
        action: "InventoryWeb",
        method: "PostInventoryTransferDetails",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      state.subPayload = {
        detailPayload: payloadDetail,
        formPayload: payloadOrder,
      };
    },
    orderProductUpdate(state, action) {
      const orderData = {
        id: action.payload.id,
        product: action.payload.product,
        form: action.payload.form,
      };
      state.subData.push(orderData);

      // state.transferDetails.push(orderData)
      // state.subPayload.push(orderData);
    },
    readySubGridVoidPayLoad(state, action) {
      const findSubOrder = state.subData?.find(
        (data) => data.id == action.payload.id
      );

      if (findSubOrder) {
        const transferForm = findSubOrder.form.map((items) => {
          const {
            INVTRA_ID,
            WAR_ID_FROM,
            WAR_ID_TO,
            TRANSFER_ASOF_DATE,
            TRANSFER_DATE,
            DESCRIPTION,
            NOTES,
            USE_ID_PREPARED_BY,
            FINZ_FLAG,
            FINZ_USE_ID,
            VOID_FLAG,
            VOID_NOTES,
            TRANSFER_BY_SKU_FLAG,
            APPROVED_FLAG,
            USE_ID_APPROVED_BY,
            READY_FOR_DELIVERY,
          } = items;

          return {
            INVTRA_ID,
            WAR_ID_TO,
            WAR_ID_FROM,
            TRANSFER_ASOF_DATE,
            TRANSFER_DATE,
            DESCRIPTION,
            NOTES,
            USE_ID_PREPARED_BY: "2694",
            FINZ_FLAG,
            FINZ_USE_ID,
            VOID_FLAG,
            VOID_NOTES,
            TRANSFER_BY_SKU_FLAG: "Y",
            APPROVED_FLAG: "Y",
            USE_ID_APPROVED_BY: "1",
            READY_FOR_DELIVERY,
          };
        });

        const TCForm = transferForm.map((obj) => {
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
          }
          return newObj;
        });

        const payloadOrder = {
          data: TCForm[0],
          method: "PostTransfer",
          password: "1234",
          action: "InventoryWeb",
          tid: "144",
          type: "rpc",
          username: "admin",
        };

        const transferDetail = findSubOrder.product.map((items, index) => {
          const {
            INVTRA_DETAIL_ID,
            INVTRA_ID,
            PAR_ID,
            QUANTITY,
            DELETE_FLAG,
            INVPARLOT_ID,
            WARSTOLOC_ID_FROM,
            WARSTOLOC_ID_TO,
            USE_ID_ASSIGNED_TO,
            WORORD_ID,
            USE_ID,
            WAR_ID_TO,
            WAR_ID_FROM,
          } = items;

          return {
            INVTRA_DETAIL_ID: findSubOrder.product[index].INVTRADET_ID,
            INVTRA_ID,
            PAR_ID,
            QUANTITY,
            DELETE_FLAG: "N",
            INVPARLOT_ID,
            WARSTOLOC_ID_FROM,
            WARSTOLOC_ID_TO,
            USE_ID_ASSIGNED_TO,
            WORORD_ID,
            USE_ID: "2694",
            WAR_ID_TO: findSubOrder.product[index].war_id_to,
            WAR_ID_FROM,
          };
        });

        const TCDetail = transferDetail.map((obj) => {
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
          }
          return newObj;
        });

        const payloadDetail = {
          data: TCDetail,
          action: "InventoryWeb",
          method: "PostTransferDetail",
          tid: "144",
          type: "rpc",
          username: "admin",
        };

        state.voidPayload = {
          detailPayload: payloadDetail,
          formPayload: payloadOrder,
        };
      }
    },
    readyGridPayLoad(state, action) {
      const findSubOrder = state.subData?.find(
        (data) => data.id == action.payload.id
      );

      if (findSubOrder) {
        const transferForm = findSubOrder.form.map((items) => {
          const {
            INVTRA_ID,
            WAR_ID_FROM,
            WAR_ID_TO,
            TRANSFER_ASOF_DATE,
            TRANSFER_DATE,
            DESCRIPTION,
            NOTES,
            USE_ID_PREPARED_BY,
            FINZ_FLAG,
            FINZ_USE_ID,
            VOID_FLAG,
            VOID_NOTES,
            TRANSFER_BY_SKU_FLAG,
            APPROVED_FLAG,
            USE_ID_APPROVED_BY,
            READY_FOR_DELIVERY,
          } = items;

          return {
            INVTRA_ID,
            WAR_ID_TO,
            WAR_ID_FROM,
            TRANSFER_ASOF_DATE,
            TRANSFER_DATE,
            DESCRIPTION,
            NOTES,
            USE_ID_PREPARED_BY: "2694",
            FINZ_FLAG: "Y",
            FINZ_USE_ID: "2694",
            VOID_FLAG: "N",
            VOID_NOTES,
            TRANSFER_BY_SKU_FLAG: "Y",
            APPROVED_FLAG: "Y",
            USE_ID_APPROVED_BY: "1",
            READY_FOR_DELIVERY,
          };
        });

        const TCForm = transferForm.map((obj) => {
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
          }
          return newObj;
        });

        const payloadOrder = {
          data: TCForm[0],
          method: "PostTransfer",
          password: "1234",
          action: "InventoryWeb",
          tid: "144",
          type: "rpc",
          username: "admin",
        };

        const transferDetail = findSubOrder.product.map((items, index) => {
          const {
            INVTRA_DETAIL_ID,
            INVTRA_ID,
            PAR_ID,
            QUANTITY,
            DELETE_FLAG,
            INVPARLOT_ID,
            WARSTOLOC_ID_FROM,
            WARSTOLOC_ID_TO,
            USE_ID_ASSIGNED_TO,
            WORORD_ID,
            USE_ID,
            WAR_ID_TO,
            WAR_ID_FROM,
          } = items;

          return {
            INVTRA_DETAIL_ID: findSubOrder.product[index].INVTRADET_ID,
            INVTRA_ID,
            PAR_ID,
            QUANTITY,
            DELETE_FLAG: "N",
            INVPARLOT_ID,
            WARSTOLOC_ID_FROM,
            WARSTOLOC_ID_TO,
            USE_ID_ASSIGNED_TO,
            WORORD_ID,
            USE_ID: "2694",
            WAR_ID_TO: findSubOrder.product[index].war_id_to,
            WAR_ID_FROM,
          };
        });

        const TCDetail = transferDetail.map((obj) => {
          const newObj = {};
          for (let key in obj) {
            newObj[key] = obj[key] === undefined ? "" : obj[key];
          }
          return newObj;
        });

        const payloadDetail = {
          data: TCDetail,
          action: "InventoryWeb",
          method: "PostTransferDetail",
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
    readyVoidPayLoad(state, action) {
      const transferForm = state.TransferForm.map((items) => {
        const {
          INVTRA_ID,
          WAR_ID_FROM,
          WAR_ID_TO,
          TRANSFER_ASOF_DATE,
          TRANSFER_DATE,
          DESCRIPTION,
          NOTES,
          USE_ID_PREPARED_BY,
          FINZ_FLAG,
          FINZ_USE_ID,
          VOID_FLAG,
          VOID_NOTES,
          TRANSFER_BY_SKU_FLAG,
          APPROVED_FLAG,
          USE_ID_APPROVED_BY,
          READY_FOR_DELIVERY,
        } = items;

        return {
          INVTRA_ID,
          WAR_ID_TO,
          WAR_ID_FROM,
          TRANSFER_ASOF_DATE,
          TRANSFER_DATE,
          DESCRIPTION,
          NOTES,
          USE_ID_PREPARED_BY: "2694",
          FINZ_FLAG,
          FINZ_USE_ID,
          VOID_FLAG,
          VOID_NOTES,
          TRANSFER_BY_SKU_FLAG: "Y",
          APPROVED_FLAG: "Y",
          USE_ID_APPROVED_BY: "1",
          READY_FOR_DELIVERY,
        };
      });

      const TCForm = transferForm.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadOrder = {
        data: TCForm[0],
        method: "PostTransfer",
        password: "1234",
        action: "InventoryWeb",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      const transferDetail = state.transferDetails.map((items, index) => {
        const {
          INVTRA_DETAIL_ID,
          INVTRA_ID,
          PAR_ID,
          QUANTITY,
          DELETE_FLAG,
          INVPARLOT_ID,
          WARSTOLOC_ID_FROM,
          WARSTOLOC_ID_TO,
          USE_ID_ASSIGNED_TO,
          WORORD_ID,
          USE_ID,
          WAR_ID_TO,
          WAR_ID_FROM,
        } = items;

        return {
          INVTRA_DETAIL_ID: state.transferDetails[index].INVTRADET_ID,
          INVTRA_ID,
          PAR_ID,
          QUANTITY,
          DELETE_FLAG: "N",
          INVPARLOT_ID,
          WARSTOLOC_ID_FROM,
          WARSTOLOC_ID_TO,
          USE_ID_ASSIGNED_TO,
          WORORD_ID,
          USE_ID: "2694",
          WAR_ID_TO: state.transferDetails[index].war_id_to,
          WAR_ID_FROM,
        };
      });

      const TCDetail = transferDetail.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
        }
        return newObj;
      });

      const payloadDetail = {
        data: TCDetail,
        action: "InventoryWeb",
        method: "PostInventoryTransferDetails",
        tid: "144",
        type: "rpc",
        username: "admin",
      };

      state.voidPayload = {
        detailPayload: payloadDetail,
        formPayload: payloadOrder,
      };
    },
    setSubPayload(state, action) {
      state.voidPayload = {};
      state.subPayload = {};
      state.TransferForm = [];
      state.transferDetails = [];
    },
    UpdateUserId(state, action) {
      state.TransferForm = state.TransferForm.map((item) => {
        item.USE_ID_ASSIGNED_TO = action.payload;
        item.APPROVED_FLAG = "Y";
        return item;
      }).filter((filteredItem) => filteredItem);
    },
    updateNotes(state, action) {
      state.TransferForm = state.TransferForm.map((item) => {
        return {
          ...item,
          NOTES: action.payload,
        };
      });
    },
    updateWarId(state, action) {
      state.TransferForm = state.TransferForm.map((item) => {
        return {
          ...item,
          WAR_ID_FROM: action.payload?.WAR_ID,
        };
      });
    },
    updateTCId(state, action) {
      state.transferDetails = state.transferDetails.map((item) => {
        return {
          ...item,
          INVTRA_ID: action.payload,
        };
      });
    },
    UpdateQty(state, action) {
      state.transferDetails = state.transferDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            item.QUANTITY = action.payload.qty;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateWarIdTo(state, action) {
      state.transferDetails = state.transferDetails
        .map((item, index) => {
          if (index == action.payload.ind) {
            item.INVENTORY_TO = action.payload.warehouse;
            item.war_id_to = action.payload.warId;
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },

    UpdateBin(state, action) {
      const { ind, bin, id } = action.payload;

      state.transferDetails = state.transferDetails
        .map((item, index) => {
          if (index === ind) {
            item.BIN_NUMBER_TO_LOC = bin;
            const currLocation = state.LocationsSet[ind].find(
              (locItem) =>
                locItem?.SECTION === item.SHELF_TO_LOC &&
                locItem?.ROW === item.RACK_TO_LOC &&
                locItem?.BIN === item.BIN_NUMBER_TO_LOC
            );
            if (currLocation) {
              item.WARSTOLOC_ID_TO = currLocation.WARSTOLOC_ID;
            } else {
              item.WARSTOLOC_ID_TO = null;
            }
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateSec(state, action) {
      const { ind, sec, id } = action.payload;

      state.transferDetails = state.transferDetails
        .map((item, index) => {
          if (index === ind) {
            item.SHELF_TO_LOC = sec;
            const currLocation = state.LocationsSet[ind].find(
              (locItem) =>
                locItem?.SECTION === item.SHELF_TO_LOC &&
                locItem?.ROW === item.RACK_TO_LOC &&
                locItem?.BIN === item.BIN_NUMBER_TO_LOC
            );
            if (currLocation) {
              item.WARSTOLOC_ID_TO = currLocation.WARSTOLOC_ID;
            } else {
              item.WARSTOLOC_ID_TO = null;
            }
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateRow(state, action) {
      const { ind, row, id } = action.payload;
      state.transferDetails = state.transferDetails
        .map((item, index) => {
          if (index === ind) {
            item.RACK_TO_LOC = row;
            const currLocation = state.LocationsSet[ind].find(
              (locItem) =>
                locItem?.SECTION === item.SHELF_TO_LOC &&
                locItem?.ROW === item.RACK_TO_LOC &&
                locItem?.BIN === item.BIN_NUMBER_TO_LOC
            );
            if (currLocation) {
              item.WARSTOLOC_ID_TO = currLocation.WARSTOLOC_ID;
            } else {
              item.WARSTOLOC_ID_TO = null;
            }
          }
          return item;
        })
        .filter((filteredItem) => filteredItem);
    },
    UpdateSku(state, action) {
      state.transferDetails = state.transferDetails
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
    onDeleteRow(state, action) {
      const updatedItems = [...state.transferDetails];
      updatedItems.splice(action.payload.index, 1);
      return {
        ...state,
        transferDetails: updatedItems,
      };
    },
    UpdateLot(state, action) {
      state.transferDetails = state.transferDetails
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
    UpdateSubBin(state, action) {
      const { ind, bin, PId } = action.payload;
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index === ind) {
                item.BIN_NUMBER_TO_LOC = bin;
                let currLocation = state.LocationsSet[ind].find(
                  (item1) =>
                    item1?.SECTION === item.SHELF_TO_LOC &&
                    item1?.ROW === item.RACK_TO_LOC &&
                    item1?.BIN === item.BIN_NUMBER_TO_LOC
                );
                if (currLocation) {
                  item.WARSTOLOC_ID_TO = currLocation.WARSTOLOC_ID;
                } else {
                  item.WARSTOLOC_ID_TO = null;
                }
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubSec(state, action) {
      const { ind, sec, PId } = action.payload;
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index === ind) {
                item.SHELF_TO_LOC = sec;
                let currLocation = state.LocationsSet[ind].find(
                  (item1) =>
                    item1?.SECTION === item.SHELF_TO_LOC &&
                    item1?.ROW === item.RACK_TO_LOC &&
                    item1?.BIN === item.BIN_NUMBER_TO_LOC
                );
                if (currLocation) {
                  item.WARSTOLOC_ID_TO = currLocation.WARSTOLOC_ID;
                } else {
                  item.WARSTOLOC_ID_TO = null;
                }
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubRow(state, action) {
      const { ind, row, PId } = action.payload;
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index === ind) {
                item.RACK_TO_LOC = row;
                let currLocation = state.LocationsSet[ind].find(
                  (item1) =>
                    item1?.SECTION === item.SHELF_TO_LOC &&
                    item1?.ROW === item.RACK_TO_LOC &&
                    item1?.BIN === item.BIN_NUMBER_TO_LOC
                );
                if (currLocation) {
                  item.WARSTOLOC_ID_TO = currLocation.WARSTOLOC_ID;
                } else {
                  item.WARSTOLOC_ID_TO = null;
                }
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubQty(state, action) {
      // console.log(action.payload, "check");
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index == action.payload.ind) {
                item.QUANTITY = action.payload.qty;
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubWarIdTo(state, action) {
      // console.log(action.payload, "check");
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.product = pOrder.product
            .map((item, index) => {
              if (index == action.payload.ind) {
                item.INVENTORY_TO = action.payload.warehouse;
                item.war_id_to = action.payload.warId;
              }
              return item;
            })
            .filter((filteredItem) => filteredItem);
        }
        return pOrder;
      });
    },
    UpdateSubVoidNotes(state, action) {
      // state.voidNotes = state.payload;
      // console.log(action.payload, "check");
      state.subData = state.subData.map((pOrder) => {
        if (pOrder.id === action.payload.PId) {
          pOrder.form = pOrder.form
            .map((item) => {
              item.VOID_FLAG = "Y";
              item.VOID_NOTES = action.payload.notes;
              (item.USE_ID_PREPARED_BY = ""), (item.FINZ_FLAG = "");
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
  },
});

export default TransferSlice;
export const {
  setNewModal,
  setPCIndex,
  setPCModal,
  setLocations,
  setSelectedWarid,
  setWareHouse,
  updateWarId,
  setTransferForm,
  addTransferDetails,
  setTransferDetails,
  setLoader,
  setRefresh,
  setUsers,
  UpdateUserId,
  UpdateQty,
  UpdateWarIdTo,
  UpdateWarLocIdTo,
  updateNotes,
  readySubGridPayLoad,
  setSubPayload,
  UpdateBin,
  UpdateSec,
  setKillSession,
  UpdateRow,
  newDetailPayload,
  newFormPayload,
  updateTCId,
  setNewForm,
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
  readyVoidPayLoad,
  readySubGridVoidPayLoad,
  UpdateSubBin,
  UpdateSubSec,
  UpdateSubWarIdTo,
  UpdateSubRow,
  UpdateSubQty,
  UpdateSubSplit,
  UpdateSubSku,
  UpdateSubLot,
  setAssignDrawer,
  setTransferList,
  addCycleCountDetails,
  onDeleteRow,
  updateVoid,
  UpdateSubVoidNotes,
  setReporting,
} = TransferSlice.actions;
