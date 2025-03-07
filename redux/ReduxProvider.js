"use client"
import { store} from "./store";
import { Provider } from "react-redux";

import React from 'react'

const ReduxProvider = ({children}) => {
  return (
    <div>
      <Provider store={store}>
        {children}
      </Provider>
    </div>
  )
}

export default ReduxProvider
