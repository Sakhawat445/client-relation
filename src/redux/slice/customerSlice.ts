// customerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '@/types/types';
import axios from 'axios';
interface CustomerState {
  customers: Customer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Removed unused OrderState initial state

const initialState: CustomerState = {
  customers: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch all customers
export const fetchCustomers = createAsyncThunk<Customer[]>(
  'customers/fetchCustomers',
  async () => {
    const response = await axios.get('api/customer'); // adjust path if needed
    if (!response.data) {
      throw new Error('Failed to fetch customers');
    }
    return (await response.data) as Customer[];
  }
);

export const updateCustomer = createAsyncThunk<Customer, Customer>(
  'customers/updateCustomer',
  async (customer: Customer) => {
    const response = await axios.put(`api/customer/${customer.id}`, customer, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 200) {
      throw new Error('Failed to update customer');
    }
    return (await response.data) as Customer;
  }
);
export const deleteCustomer = createAsyncThunk<string, string>(
  'customers/deleteCustomer',
  async (customerId: string) => {
    // Ensure the URL starts with a slash
    const response = await axios.delete(`/api/customer/${customerId}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete customer');
    }
    return customerId;
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

    builder.addCase(deleteCustomer.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    builder.addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = 'succeeded';
      state.customers = state.customers.filter((customer) => customer.id !== action.payload);
    })
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to delete customer';
    });

    // updateCustomer
    builder.addCase(updateCustomer.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload, 'action.payload');
      
      state.customers = state.customers.map((customer) =>
        customer.id === action.payload.id ? action.payload : customer
      );
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to update customer';
    });
  },

});
export default customerSlice.reducer;
