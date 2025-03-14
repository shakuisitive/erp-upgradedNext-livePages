import { createSlice } from "@reduxjs/toolkit";

const periodSlice = createSlice({
    name: "periodSlice",
    initialState: {
        refreshing: 0,
        activityDrawer: false,
        formIndex: [],
        updateSalePriority: false,
        editFormModal: false,
        newFormModal: false,
    },
    reducers: {
        setRefreshing(state, action) {
            state.refreshing += 1;
        },
        setFormIndex(state, action) {
            state.formIndex = action.payload;
            state.activityDrawer = true;
        },
        closeDrawer(state, action) {
            state.formIndex = null;
            state.activityDrawer = false
        },
        setUpdate(state, action) {
            state.updateSalePriority = action.payload
        },
        // setFormIndex(state, action) {
        //     state.formIndex = action.payload;
        //     state.editFormModal = true;
        // },
        setNewModal(state, ation) {
            state.newFormModal = true;
        },
        closeEditModal(state, action) {
            state.formIndex = null;
            state.editFormModal = false;
            state.newFormModal = false;
            state.htCodeFormData = [];
        },
    },
});

export default periodSlice;

export const {
    setRefreshing,
    setFormIndex,
    closeDrawer,
    onDataLoad,
    setPayableReceivable,
    setUpdate,
    setNewModal,
    closeEditModal,
} = periodSlice.actions;
