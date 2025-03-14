import { createSlice } from "@reduxjs/toolkit";

const RoleSlice = createSlice({
  name: "RoleSlice",
  initialState: {
    RoleHead: [],
    defHead: [],
    files: [],
    editorData: "",
    ChatData: [],
    GridFilterState:{},
    GridFilterStateA: false,
    roleMainGrid: [],
    RoleId: null,
    openPermissionModal: false,
  },
  reducers: {
    setEditHead(state, action) {
      if (state.RoleHead[action.payload].hidden == false) {
        state.RoleHead[action.payload].hidden = true;
      } else if (state.RoleHead[action.payload].hidden == true) {
        state.RoleHead[action.payload].hidden = false;
      }
    },
    setHeadReduxT(state, action) {
      if (action.payload.cat == true) {
        state.RoleHead[action.payload.index].def = true;
        state.RoleHead[action.payload.index].title = action.payload.hData;
      } else if (action.payload.cat == false) {
        state.RoleHead[action.payload.index].def = false;
        state.RoleHead[action.payload.index].title =
          state.defHead[action.payload.index].title;
      }
    },
    setHeadRedux(state , action){
      state.RoleHead = action.payload
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
    setMainRoleList(state, action) {
      state.roleMainGrid = action.payload;
    },
    openPermissionModal(state, action) {
      state.RoleId = action.payload.AUTGRO_ID;
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

export default RoleSlice;

export const {setEditHead, setHeadReduxT, setHeadRedux, closePermissionModal, openPermissionModal, setPostLikes, setChatData, addFile, gridFilter, setMainRoleList} = RoleSlice.actions;