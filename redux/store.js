import { configureStore } from "@reduxjs/toolkit";
import credReducer from '../redux/slice/ArraySlice';
import { Editarray } from "./slice/EditSlice";

export const store = configureStore({
    reducer: {
        CredentialArray: credReducer,
        Editarray: Editarray
    },
})