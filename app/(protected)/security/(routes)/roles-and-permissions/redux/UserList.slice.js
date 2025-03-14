import { createSlice } from "@reduxjs/toolkit";

const UserListSlice = createSlice({
  name: "UserListSlice",
  initialState: {
    Head: [],
    defHead: [],
  },
  reducers: {
    setEditHead(state, action) {
      if (state.UserHead[action.payload].hidden == false) {
        state.UserHead[action.payload].hidden = true;
      } else if (state.UserHead[action.payload].hidden == true) {
        state.UserHead[action.payload].hidden = false;
      }
    },
    setHeadReduxT(state, action) {
      if (action.payload.cat == true) {
        state.UserHead[action.payload.index].def = true;
        state.UserHead[action.payload.index].title = action.payload.hData;
      } else if (action.payload.cat == false) {
        state.UserHead[action.payload.index].def = false;
        state.UserHead[action.payload.index].title =
          state.defHead[action.payload.index].title;
      }
    },
  },
});

export default UserListSlice;

export const {setEditHead, setHeadReduxT} = UserListSlice.actions;