import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { lightTheme, darkTheme } from "./Themes";

const loadAuthFromStorage = () => {
  try {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userName = localStorage.getItem("userName") || "";
    return { isLoggedIn, userName };
  } catch {
    return { isLoggedIn: false, userName: "" };
  }
};

const { isLoggedIn: storedIsLoggedIn, userName: storedUserName } = loadAuthFromStorage();

const initialState = {
  userMenu: [],
  favList: [],
  isLoading: true,
  meals: [],
  detailedMealID: null,
  isLoggedIn: storedIsLoggedIn,
  userName: storedUserName,
  theme: lightTheme,
  lang: "en",
};

export const getUserMeals = createAsyncThunk(
  "user/getUserMenu",
  async (selectedMealID, thunkAPI) => {
    try {
      const response = await axios(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealID}`
      );
      const meal = response.data.meals[0];

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients.push({ name: ing.trim(), measure: measure?.trim() || "" });
        }
      }

      return {
        id: meal.idMeal,
        title: meal.strMeal,
        images: [meal.strMealThumb],
        area: meal.strArea,
        category: meal.strCategory,
        instructions: meal.strInstructions,
        ingredients,
      };
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
      state.userMenu.push(action.payload);
    },
    removeFromUserMenu: (state, action) => {
      const filteredArr = state.userMenu.filter(
        (item) => item !== action.payload
      );
      state.userMenu = filteredArr;
    },
    addToFavList: (state, action) => {
      state.favList.push(action.payload);
    },
    removeFromFavList: (state, action) => {
      const filteredArr = state.favList.filter(
        (item) => item !== action.payload
      );
      state.favList = filteredArr;
    },
    removeFromUserMeals: (state, action) => {
      const filteredArr = state.meals.filter(
        (item) => item.id !== action.payload
      );
      state.meals = filteredArr;
    },
    registerUserName: (state, action) => {
      state.userName = action.payload;
      try { localStorage.setItem("userName", action.payload); } catch {}
    },
    login: (state) => {
      state.isLoggedIn = true;
      try { localStorage.setItem("isLoggedIn", "true"); } catch {}
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = "";
      try {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
      } catch {}
    },
    themeHandler: (state, action) => {
      switch (action.payload) {
        case "lightTheme":
          state.theme = lightTheme;
          break;
        case "darkTheme":
          state.theme = darkTheme;
          break;
        default:
          state.theme = lightTheme;
          break;
      }
    },
    langHandler: (state, action) => {
      state.lang = action.payload;
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
export const {
  addToUserMenu,
  removeFromUserMenu,
  addToFavList,
  removeFromFavList,
  removeFromUserMeals,
  registerUserName,
  login,
  logout,
  themeHandler,
  langHandler,
} = userSlice.actions;

export default userSlice.reducer;
