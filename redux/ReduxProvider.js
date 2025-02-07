"use client"
import { store, persistor} from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import React from 'react'

const ReduxProvider = ({children}) => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        {children}
        </PersistGate>
      </Provider>
    </div>
  )
}

export default ReduxProvider
