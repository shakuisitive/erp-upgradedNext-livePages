// slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setlogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, setlogout } = AuthSlice.actions;

export default AuthSlice.reducer;
