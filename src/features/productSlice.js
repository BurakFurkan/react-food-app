import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
  category: "burger",
  products: [],
  isLoading: true,
  page:1,
  categories :{
    burger:"burger",
    kebab:"kebab",
    chicken:"chicken",
    pizza:"pizza",
    fish:"fish",
    vegan:"vegan",
    salad:"salad",
    pasta:"pasta",
    steak:"steak",
    dessert:"dessert",
    waffle:"waffle",
}

};



export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (selectedCategory,thunkAPI) => { 
    const currentState = thunkAPI.getState();
    try {
      
      const response = await axios(`https://api.spoonacular.com/food/menuItems/search?query=${selectedCategory}&number=12&offset=${currentState.product.page}&apiKey=${process.env.REACT_APP_API_KEY}`);
      return await response.data;
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
    },
  },
});

// Action creators are generated for each case reducer function
export const { pickCategory,nextPage,previousPage } = productSlice.actions;

export default productSlice.reducer;


