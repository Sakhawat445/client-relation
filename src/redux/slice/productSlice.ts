import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types/types";
import axios from "axios";
import { ProductState } from "@/types/types";
const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    try {
      const res = await axios.get<Product[]>("/api/product");
      return res.data;
    } catch {
      throw new Error("Failed to fetch products");
    }
  },
);

export const createProduct = createAsyncThunk<Product, Omit<Product, "id">>(
  "products/createProduct",
  async (productData) => {
    try {
      const res = await axios.post<Product>("/api/product", productData);
      return res.data;
    } catch {
      throw new Error("Failed to create product");
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "Failed to fetch products";
    });

    builder.addCase(createProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "Failed to create product";
    });
  },
});

export default productSlice.reducer;
