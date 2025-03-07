import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import credReducer from '../redux/slice/ArraySlice';
import { Editarray } from "./slice/EditSlice";

const rootReducer = combineReducers({
    CredentialArray: credReducer,
    Editarray: Editarray
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });