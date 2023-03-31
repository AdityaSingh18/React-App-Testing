import { createSlice } from "@reduxjs/toolkit";

const initialPremium={
    isPremium: false,
    showButton:true,
    theme: 'false'

}

export const premiumSlice = createSlice({

    name:'premium',
    initialState:initialPremium,
    reducers:{
        setIsPremium(state,action){
            state.isPremium=action.payload;
        },
        showBuyButton(state,action){
        state.showButton = action.payload
        }
        ,

        changeTheme(state){
         state.theme = !state.theme;
        }
    }

})