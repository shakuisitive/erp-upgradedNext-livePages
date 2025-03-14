

import { createSlice } from "@reduxjs/toolkit";








const MobilBotNavSlices = createSlice({
    name: "MobilBotNavSlice",
    initialState: {
        functions: [],
        pageState: 0
      

    },
    reducers: {
        pageFunction(state, action) {

            state.pageState = action.payload
           

        },

      

    },

})

export default MobilBotNavSlices;

export const {
    pageFunction,
    
} = MobilBotNavSlices.actions;