import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const credSlice = createSlice({
  name: 'credarray',
  initialState,
  reducers: {
    additem: (state , action) => {
      state.items.push(action.payload);
    },
    removeitem: (state , action) => {
      state.items.splice(action.payload,1);
    },
  },
})

export const { additem, removeitem } = credSlice.actions

export default credSlice.reducer