import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/react";

// Define the shape of the user data
interface User {
  name: string;
  email: string;
}

// Define the shape of the auth state
interface AuthState {
  user: User | null;
  users: User[]; // Array to store registered users
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  users: [], // Users list
  loading: false,
  error: null,
};

// Async thunk for registration
export const registerUser = createAsyncThunk<
  User, // Return type
  { name: string; email: string; password: string }, // Argument type
  { rejectValue: string } // Error type
>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk<
  User, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Error type
>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (res?.error) {
        return rejectWithValue(res.error);
      }

      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();

      if (!sessionResponse.ok || !sessionData.user) {
        throw new Error("Failed to retrieve user session");
      }

      return sessionData.user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Login failed");
    }
  }
);

export const resetPassword = createAsyncThunk<
  { message: string }, // Return type
  string, // Argument type (email)
  { rejectValue: string } // Error type
>(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

export const newPassword = createAsyncThunk<
  { message: string }, // Return type
  { token: string; password: string }, // Argument type
  { rejectValue: string } // Error type
>(
  "auth/newPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/newPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
  await signOut({ redirect: false });
  dispatch(authSlice.actions.logoutUser());
});

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      });
  },
});

// Export actions
export const { logoutUser: logoutUserAction } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
