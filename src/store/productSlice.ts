import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types/types";

interface ProductsState {
  products: Product[];
  searchTerm: string;
  suggestions: Product[];
  sortBy: string;
  isLoading: boolean;
}

const initialState: ProductsState = {
  products: [],
  searchTerm: "",
  suggestions: [],
  sortBy: "price-lowest",
  isLoading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const [womenResponse, maleResponse] = await Promise.all([
      axios.get<Product[]>(
        `https://fakestoreapi.com/products/category/women's%20clothing`
      ),
      axios.get<Product[]>(
        `https://fakestoreapi.com/products/category/men's%20clothing`
      ),
    ]);
    return [...womenResponse.data, ...maleResponse.data];
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilterTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      });
  },
});

export const { setFilterTerm, setSuggestions, clearSuggestions, setSortBy } =
  productsSlice.actions;

export default productsSlice.reducer;
