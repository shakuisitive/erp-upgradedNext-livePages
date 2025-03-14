"use client"

// import {  store } from "./store";
import { store } from "./store";
import { Provider } from "react-redux";
// const { Provider } = require("react-redux")

export default function ReduxStoreProvider({ children }) {
  return (
    <Provider store={store} >
    
        {children}
    
    </Provider>
  );
}
