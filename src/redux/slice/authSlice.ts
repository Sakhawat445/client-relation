// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { signIn, signOut } from "next-auth/react";
// // Define the shape of the user data
// type User = {
//   id: string;
//   name: string;
//   email: string;
//   photoURL?: string; // Add this line

//   // Add other fields as necessary
// }

// // Define the shape of the auth state
// interface AuthState {
//   user: User |null;
//   users: User[]; // Array to store registered users
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: AuthState = {
//   user: null,
//   users: [], // Users list
//   loading: false,
//   error: null,
// };

// // Async thunk for registration
// export const registerUser = createAsyncThunk<
//   User, // Return type
//   { name: string; email: string; password: string }, // Argument type
//   { rejectValue: string } // Error type
// >(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed. Please try again.");
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
//     }
//   }
// );

// // Async thunk for login
// export const loginUser = createAsyncThunk<
//   User, // Return type
//   { email: string; password: string }, // Argument type
//   { rejectValue: string } // Error type
// >(
//   "auth/loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await signIn("credentials", {
//         redirect: false,
//         email: credentials.email,
//         password: credentials.password,
//       });

//       if (res?.error) {
//         return rejectWithValue(res.error);
//       }

//       const sessionResponse = await fetch("/api/auth/session");
//       const sessionData = await sessionResponse.json();

//       if (!sessionResponse.ok || !sessionData.user) {
//         throw new Error("Failed to retrieve user session");
//       }

//       return sessionData.user;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : "Login failed");
//     }
//   }
// );

// export const resetPassword = createAsyncThunk<
//   { message: string }, // Return type
//   string, // Argument type (email)
//   { rejectValue: string } // Error type
// >(
//   "auth/resetPassword",
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await fetch("/api/auth/reset", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to send reset email.");
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
//     }
//   }
// );

// export const newPassword = createAsyncThunk<
//   { message: string }, // Return type
//   { token: string; password: string }, // Argument type
//   { rejectValue: string } // Error type
// >(
//   "auth/newPassword",
//   async ({ token, password }, { rejectWithValue }) => {
//     try {
//       const response = await fetch("/api/auth/newPassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to update password.");
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
//     }
//   }
// );

// // Async thunk for logout
// export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
//   await signOut({ redirect: false });
//   dispatch(authSlice.actions.logoutUser());
// });

// // Create the auth slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Registration cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.users.push(action.payload);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Registration failed";
//       })

//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Login failed";
//       });
//   },
// });

// // Export actions
// export const { logoutUser: logoutUserAction } = authSlice.actions;

// // Export reducer
// export default authSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";

// Define the shape of the user data
type User = {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
};

// Define the shape of the auth state
interface AuthState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

// Async thunk for registration

export const registerUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Async thunk for login

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });
    if (res?.error) {
      return rejectWithValue(res.error);
    }
    const sessionResponse = await axios.get("/api/auth/register", {
      headers: { "Content-Type": "application/json" },
    });
    const sessionData = sessionResponse.data;
    if (!sessionData) {
      throw new Error("Failed to retrieve user session");
    }
    return sessionData;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Login failed"
    );
  }
});// Async thunk for password reset
// Reset Password
export const resetPassword = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>("auth/resetPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "/api/auth/reset",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset email."
      );
    }
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

// Async thunk for new password
export const newPassword = createAsyncThunk<
  { message: string },
  { token: string; password: string },
  { rejectValue: string }
>("auth/newPassword", async ({ token, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "/api/auth/newPassword",
      { token, password },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update password."
      );
    }
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/auth/register", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensure cookies/session are sent
    });

    const sessionData = response.data;
    console.log("Session data:", sessionData); // Debugging line

    if (!sessionData) {
      throw new Error("User data not found in session");
    }

    return sessionData as User;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch user data"
    );
  }
});
console.log("fetchUserData", fetchUserData);
// Async thunk
//  for logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    await signOut({ redirect: false });
    dispatch(authSlice.actions.logoutUser());
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
    },
    updateUser: (
      state,
      action: PayloadAction<{ name: string; imageURL: string }>
    ) => {
      if (state.user) {
        state.user.name = action.payload.name;
        state.user.imageURL = action.payload.imageURL;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch user data";
      })
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
export const { logoutUser: logoutUserAction, updateUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
