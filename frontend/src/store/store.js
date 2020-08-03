import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState = {
  isLoggedIn: true,
  user: {
    id: "",
    name: "",
    email: "",
  },
};

const context = createContext(initialState);
const { Provider } = context;

const Store = ({ children }) => {
  const state = useReducer(reducer, initialState);
  return <Provider value={state}>{children}</Provider>;
};

export { context, Store };
