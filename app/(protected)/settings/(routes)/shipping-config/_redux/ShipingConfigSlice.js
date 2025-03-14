import { createSlice } from "@reduxjs/toolkit";

const shippinfConfigSlice = createSlice({
    name : "shippingConfigSlice",
    initialState : {
        refreshing: false,
    activityDrawer: false,
    formIndex: null,
    inputData: [],

    },
    reducers:{
        setRefreshing ( state,action){
        state.refreshing = action.payload
        },

        setInputData(state,action){
         state.inputData = action.payload
        },
        setFormIndex(state,action){
            state.formIndex = action.payload
            state.activityDrawer = true;
        },
        closeDrawer(state,action){
            state.formIndex = null
            state.activityDrawer = false
        }

        
        
    }
})
export default shippinfConfigSlice;

export const {setFormIndex,setInputData,setRefreshing,closeDrawer} =shippinfConfigSlice.actions