import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import axios from "axios";




const initialState = {
  userMenu: [],
  isLoading: true,
  meals:[]
};

export const getUserMeals = createAsyncThunk(
  "user/getUserMenu",
  async (selectedMealID, thunkAPI) => { 

    try {
      const response = await axios(`https://api.spoonacular.com/food/menuItems/${selectedMealID}?addMenuItemInformation=true&apiKey=${process.env.REACT_APP_API_KEY}`);
      return await response.data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToUserMenu: (state, action) => {
      state.userMenu.push(action.payload) ;
    },
    

  },
  extraReducers: {
    [getUserMeals.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserMeals.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.meals.push(action.payload);
    },
    [getUserMeals.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToUserMenu, resetMeals } = userSlice.actions;

export default userSlice.reducer;


