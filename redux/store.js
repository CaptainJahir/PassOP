import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit";
import credReducer from '../redux/slice/ArraySlice';
import { Editarray } from "./slice/EditSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["CredentialArray"]
};

const rootReducer = combineReducers({
    CredentialArray: credReducer,
    Editarray: Editarray
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const persistor = persistStore(store);