import { createSlice } from "@reduxjs/toolkit"

const initialExpenseState = {
    expenses: [],

}
export const expenseSlice = createSlice({
    name:'expenses',
    initialState:initialExpenseState,
    reducers:{
        addExpense(state,action){
         state.expenses = [action.payload]
         console.log(state.expenses)
        }
,
    }
})