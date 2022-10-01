import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import {lightTheme,darkTheme} from "./Themes";




const initialState = {
  userMenu: [],
  isLoading: true,
  meals:[],
  detailedMealID:null,
  isLoggedIn:false,
  userName:"",
  theme:lightTheme,
  lang:"en",
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
    removeFromUserMenu:(state,action) =>{
      const filteredArr = state.userMenu.filter((item) => item!== action.payload)
      state.userMenu = filteredArr;
    },
    removeFromUserMeals:(state,action) =>{
      const filteredArr = state.meals.filter((item) => item.id!== action.payload)
      state.meals = filteredArr;
    },
    registerUserName:(state,action) =>{
      state.userName = action.payload
    },
    login:(state) =>{
      state.isLoggedIn = true
    },
    themeHandler:(state,action) =>{
      switch (action.payload) {
        case "lightTheme":
          state.theme=lightTheme
          break;
        case "darkTheme":
          state.theme=darkTheme
          break;
        default:
          state.theme=lightTheme
          break;
      }
    },
    langHandler:(state,action)=>{
      state.lang=action.payload
    }

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
export const { addToUserMenu,removeFromUserMenu,removeFromUserMeals,registerUserName,login,themeHandler,langHandler } = userSlice.actions;

export default userSlice.reducer;


