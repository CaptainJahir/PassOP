import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const EditSlice = createSlice({
    name: 'Editarray',
    initialState,
    reducers:{
        addEdit : (state , action) => {
            state.value.push(action.payload);
        },
        removeall: (state , action) => {
            state.value = []
        }
    }
})

export const { addEdit, removeall } = EditSlice.actions;
export const Editarray = EditSlice.reducer;