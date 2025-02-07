import { createSlice } from '@reduxjs/toolkit'

const data = localStorage.getItem('creds');
const localStorageitems = () => {
  if (data != null) {
    return JSON.parse(data);
 }else{
    return [];
 }
}
const initialState = {
  items: localStorageitems(),
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

// Action creators are generated for each case reducer function
export const { additem, removeitem } = credSlice.actions

export default credSlice.reducer