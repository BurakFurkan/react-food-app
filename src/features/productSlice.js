import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const PAGE_SIZE = 12;

const initialState = {
  category: "Chicken",
  products: [],
  isLoading: true,
  page: 1,
  error: false,
  categories: {
    Beef: "Beef",
    Breakfast: "Breakfast",
    Chicken: "Chicken",
    Dessert: "Dessert",
    Lamb: "Lamb",
    Pasta: "Pasta",
    Seafood: "Seafood",
    Side: "Side",
    Starter: "Starter",
    Vegan: "Vegan",
    Vegetarian: "Vegetarian",
  },
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (selectedCategory, thunkAPI) => {
    const currentState = thunkAPI.getState();
    try {
      const response = await axios(
        `${BASE_URL}/filter.php?c=${selectedCategory}`
      );
      const allMeals = response.data.meals || [];
      const page = currentState.product.page;
      const offset = (page - 1) * PAGE_SIZE;
      const paginated = allMeals.slice(offset, offset + PAGE_SIZE);

      return {
        menuItems: paginated.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          restaurantChain: selectedCategory,
        })),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    pickCategory: (state, action) => {
      state.category = action.payload;
    },
    nextPage: (state) => {
      state.page += 1
    },
    previousPage: (state) => {
      state.page -= 1
    },

  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      (action.error.message==="Rejected")?(state.error=true) : (state.error=false)
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { pickCategory,nextPage,previousPage } = productSlice.actions;

export default productSlice.reducer;


