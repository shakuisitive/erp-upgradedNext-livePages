import { createSlice } from "@reduxjs/toolkit";

const PermissionSlice = createSlice({
  name: "RoleSlice",
  initialState: {
    PerHead: [],
    defHead: [],
    files: [],
    editorData: "",
    ChatData: [],
    GridFilterState:{},
    GridFilterStateA: false,
    perMainGrid: [],
    PerId: null,
    openPermissionModal: false,
  },
  reducers: {
    setEditHead(state, action) {
      if (state.PerHead[action.payload].hidden == false) {
        state.PerHead[action.payload].hidden = true;
      } else if (state.PerHead[action.payload].hidden == true) {
        state.PerHead[action.payload].hidden = false;
      }
    },
    setHeadReduxT(state, action) {
      if (action.payload.cat == true) {
        state.PerHead[action.payload.index].def = true;
        state.PerHead[action.payload.index].title = action.payload.hData;
      } else if (action.payload.cat == false) {
        state.PerHead[action.payload.index].def = false;
        state.PerHead[action.payload.index].title =
          state.defHead[action.payload.index].title;
      }
    },
    setHeadRedux(state , action){
      state.PerHead = action.payload
      state.defHead = action.payload
    },
    addFile(state, action) {
      console.log(action.payload)
      state.files.push(action.payload);
    },
    setChatData(state, action) {
      state.ChatData.push(action.payload);
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
    gridFilter(state, action) {
      state.GridFilterState = action.payload;
      state.GridFilterStateA = true;
    },
    setMainPerList(state, action) {
      state.perMainGrid = action.payload;
    },
    openPermissionModal(state, action) {
      state.PerId = action.payload.AUTGRO_ID;
      state.openPermissionModal = true;
    },
    closePermissionModal(state, action) {
      state.openPermissionModal = false;
      // state.postPurchaseDetail = [];
      // state.subGridState = [];

      // console.log('set reset chulling ' , state.openPermissionModal  );
    },
  },
});

export default PermissionSlice;

export const {setEditHead, setHeadReduxT, setHeadRedux, closePermissionModal, openPermissionModal, setPostLikes, setChatData, addFile, gridFilter, setMainPerList} = PermissionSlice.actions;