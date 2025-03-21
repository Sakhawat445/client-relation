// customerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Customer } from '@/types/types';
interface CustomerState {
  customers: Customer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch all customers
export const fetchCustomers = createAsyncThunk<Customer[]>(
  'customers/fetchCustomers',
  async () => {
    const response = await fetch('api/customer'); // adjust path if needed
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return (await response.json()) as Customer[];
  }
);

// Async thunk to create a new customer
export const createCustomer = createAsyncThunk<Customer, Omit<Customer, 'id'>>(
  'customers/createCustomer',
  async (customerData) => {
    const response = await fetch('api/customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error('Failed to create customer');
    }
    return (await response.json()) as Customer;
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Add synchronous reducers if needed.
  },
  extraReducers: (builder) => {
    // fetchCustomers
    builder.addCase(fetchCustomers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.customers = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Failed to fetch customers';
    });

    // createCustomer
    builder.addCase(createCustomer.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.customers.push(action.payload);
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Failed to create customer';
    });
  },
});

export default customerSlice.reducer;
