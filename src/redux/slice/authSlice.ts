import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the auth state type
interface AuthState {
  user: { email: string; name: string } | null;
  loading: boolean;
  error: string | null;
}

// Mock authentication function
const mockAuth = async ({ email, password }: { email: string; password: string }) => {
  const validUser = { email: "", password: "" };

  if (email === validUser.email && password === validUser.password) {
    return { email, name: validUser }; // ✅ Simulate successful login
  } else {
    throw new Error("Invalid credentials");
  }
};

// Register User (API-based)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Login User (Using mock authentication)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await mockAuth(userData); // ✅ Using mock authentication
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define initial state using AuthState type
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
