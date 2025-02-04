import { configureStore } from "@reduxjs/toolkit";
import credReducer from '../redux/slice/ArraySlice'

export const store = configureStore({
    reducer: {
        CredentialArray: credReducer
    },
})