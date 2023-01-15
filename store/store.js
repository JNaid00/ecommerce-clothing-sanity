import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import myCart from "./cartSlice";
import counter from './counterSlice'
const combinedReducer = combineReducers({
  myCart,
  counter,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore);
