import { createSlice,configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { expenseSlice } from "./expense";
import { premiumSlice } from "./premium";


const store = configureStore({
    reducer: {auth:authSlice.reducer,expense:expenseSlice.reducer, premium:premiumSlice.reducer}
})


export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
export const premiumActions = premiumSlice.actions;
export default store;