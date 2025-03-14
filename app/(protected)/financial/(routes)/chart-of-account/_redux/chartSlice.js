import { createSlice } from "@reduxjs/toolkit";

const ChartSlice = createSlice({
  name: "chartSlice",
  initialState: {
    // refreshing: false,
    editFormModal: false,
    newFormModal: false,
    nextFocus: null,
    chartFormData: [],
    chartEditDetForm: [],
    // formIndex: null,
    inputData: [],
    searchedData: [],
    isHitApi: false,
    refreshing: false,
    ChatData: [],
    editorData: "",
    postLikes: [],
    files: [],
    pageCount: 25,
    activityDrawer: false,
    uow: false,
    index: [],
    closeModall: false,
    count: 0,
    countArray: [],
    formIndex: [],
    openModallForm: false,
    uowHead: [],
    uowMainGrid: [],
    isObjectEqual: true,
    formPayload: [],
    Refresh: false,
    enabled: true,
    refArray: [],
    defHead: [],
    chartBudget: [],
    accountIDss: null,
    names: null,
    purposedBudget: null,
    currentBudget: null,
    // chartBudget: [],
    name: null,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAccountIDs(state, action) {
      state.accountIDss = action.payload;
    },
    setNames(state, action) {
      state.names = action.payload;
    },
    setPurposedBudgets(state, action) {
      state.purposedBudget = action.payload;
    },
    setCurentBudgets(state, action) {
      state.currentBudget = action.payload;
    },
    setBBudget(state, action) {
      state.chartBudget = action.payload;
    },
    closeModal(state, action) {
      state.isModal = false;
      state.formIndex = null;
      state.editDetForm = [];
      state.editFormVariance = [];
      state.ImagesData = [];
    },

    setRefreshing(state, action) {
      state.refreshing = action.payload;
      // console.log("refreshing redux", action.payload);
    },

    setFormPayload(state, action) {
      state.formPayload = action.payload;
    },
    setObjectEqual(state, action) {
      state.isObjectEqual = action.payload;
    },
    setIsHitApi(state, action) {
      state.isHitApi = action.payload;
      state.searchedData = [];
    },
    setSearchData(state, action) {
      state.searchedData[0] = action.payload;
    },
    closeDrawer(state, action) {
      state.formIndex = null;
      state.activityDrawer = false;
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
      console.log(postIndex);
      if (postIndex !== -1) {
        const post = state.ChatData[postIndex];

        if (!post.likedBy.includes(userId)) {
          state.ChatData[postIndex] = {
            ...post,
            likes: post.likes + 1,
            likedBy: [...post.likedBy, userId],
          };
        } else {
          console.log("user already included");
        }
      } else {
        console.log("not");
      }
    },
    addFile(state, action) {
      state.files.push(action.payload);
    },

    setHeadRedux(state, action) {
      state.uowHead = action.payload;
      state.defHead = action.payload;
    },
    setEditHead(state, action) {
      if (state.uowHead[action.payload].hidden == false) {
        state.uowHead[action.payload].hidden = true;
      } else if (state.uowHead[action.payload].hidden == true) {
        state.uowHead[action.payload].hidden = false;
      }
    },

    setuow(state, action) {
      state.uow = action.payload;
    },
    setIndex(state, action) {
      state.count += 1;
      state.countArray.push(state.count);
      if (!state.index.includes(action.payload)) {
        state.index.push(action.payload); // Add the unique index to the state
      }
    },
    setcloseModall(state, action) {
      state.closeModall = action.payload;
    },
    // setFormIndex(state, action) {
    //   state.formIndex = action.payload;
    //   state.activityDrawer = true;
    //   // console.log("modall open redux", action.payload);
    // },
    openForm(state, action) {
      state.formIndex = action.payload;
      (state.openModallForm = true), (state.enabled = true);
      // console.log("modall open redux", action.payload);
    },
    setHeadReduxT(state, action) {
      if (action.payload.cat == true) {
        state.uowHead[action.payload.index].def = true;
        state.uowHead[action.payload.index].title = action.payload.hData;
      } else if (action.payload.cat == false) {
        state.uowHead[action.payload.index].def = false;
        state.uowHead[action.payload.index].title =
          state.defHead[action.payload.index].title;
      }
    },
    setRefresh(state, action) {
      state.Refresh = action.payload;
    },
    setMainuowList(state, action) {
      state.uowMainGrid = action.payload;
    },
    closeModallForm(state, action) {
      state.openModallForm = false;

      // console.log('set reset chulling ' , state.openModallForm  );
    },
    OpenNewModalForm(state, action) {
      state.openModallForm = true;
      state.enabled = false;
    },

    addRef(state, action) {
      state.refArray.push(action.payload);
    },
    setNextIndex(state, action) {
      state.nextFocus = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setInputData(state, action) {
      state.inputData = action.payload;
    },

    setFormIndex(state, action) {
      state.formIndex = action.payload;
      state.editFormModal = true;
    },
    setNewModal(state, ation) {
      state.newFormModal = true;
    },
    closeEditModal(state, action) {
      state.formIndex = null;
      state.editFormModal = false;
      state.newFormModal = false;
      state.chartFormData = [];
    },

    setChartFormData(state, action) {
      state.chartFormData = action.payload[0];
    },
    setChartBudget(state, action) {
      state.chartBudget = action.payload;
    },
  },
});

export default ChartSlice;

export const {
  setInputData,
  setRefreshing,
  closeModal,
  setFormIndex,
  closeEditModal,
  setChartFormData,
  setNextIndex,
  setNewModal,
  setPageCount,
  ChartEditForm,
  addRef,
  closeModallForm,
  setuow,
  setIndex,
  setcloseModall,
  openForm,
  addFile,
  setChartBudget,
  setIsHitApi,
  setSearchData,
  setChatData,
  setEditorData,
  setPostLikes,
  setEditHead,
  setHeadRedux,
  setHeadReduxT,
  setRefresh,
  setFormPayload,
  setObjectEqual,
  OpenNewModalForm,
  setMainuowList,
  closeDrawer,
  setAccountIDs,
  setCurentBudgets,
  setPurposedBudgets,
  setNames,
  setBBudget,
  setName,
} = ChartSlice.actions;
