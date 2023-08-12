import React, { createContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";

export const ListGlobalContext = createContext("Initial Value");

// Load cart data from local storage if available, otherwise use the default data.
const data = {
  list: JSON.parse(localStorage.getItem("list")) || [], // Corrected initial data format
};

export default function ListContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);

  // Save cart data to local storage whenever the cart state changes.
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(state.list));
  }, [state.list]);

  return (
    <ListGlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </ListGlobalContext.Provider>
  );
}
