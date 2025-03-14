import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: false,
        username: typeof window !== 'undefined' ? localStorage.getItem("username") || null : null,
        useId: typeof window !== 'undefined' ? localStorage.getItem("use_id") || null : null,
        tokenSession: typeof window !== 'undefined' ? localStorage.getItem("tokenSession") || null : null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.username = action.payload.username;
            state.useId = action.payload.use_id;
            state.tokenSession = action.payload.access_token;

            localStorage.setItem("username", action.payload.username);
            localStorage.setItem("use_id", action.payload.use_id);
            localStorage.setItem("tokenSession", action.payload.access_token);
        },
        clearUser(state) {
          
            state.user = false;
            state.username = null;
            state.useId = null;
            state.tokenSession = null;

            localStorage.removeItem("username");
            localStorage.removeItem("use_id");
            localStorage.removeItem("tokenSession");
        }
    }
});

export const { setUser,clearUser } = userSlice.actions;
export default userSlice;
