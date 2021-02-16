import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const initialState = {
  payments: [],
  status: 'idle',
  error: null
};

const baseUrl="http://localhost:8080/payments";

export const fetchPayments = createAsyncThunk('payments/fetchPayments', async () => {
  const response = await fetch(`${baseUrl}`, {
      method: 'GET'
  });
  return response.json();
});

export const addNewPayment = createAsyncThunk('payments/addNewPayment', async(paymentInfo) => {
  const response = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(paymentInfo)
  });
  return response.json();
});

export const editPaymentDetails = createAsyncThunk('payments/editPayment', async(paymentInfo) => {
  const response = await fetch(`${baseUrl}/${paymentInfo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(paymentInfo)
  });
  return response.json();
});

export const deletePaymentDetails = createAsyncThunk('payments/deletePayment', async(paymentId) => {
  const response = await fetch(`${baseUrl}/${paymentId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'}
  });
  return response.json();
})

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPayments.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPayments.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.payments = state.payments.concat(action.payload)
    },
    [fetchPayments.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPayment.fulfilled]: (state, action) => {
      state.payments.push(action.payload);
    },
    [editPaymentDetails.fulfilled]: (state, action) => {
      state.payments = state.payments.filter(payment => payment.id !== action.payload.id);
      state.payments.push(action.payload);
    },
    [deletePaymentDetails.fulfilled]: (state, action) => {
      state.payments = state.payments.filter(payment => payment.id !== action.payload.id);
    }
  }
})

const { actions, reducer } = paymentsSlice
export const { createPayment, updatePayment, deletePayment } = actions
export const selectAllPayments = state => state.payments.payments
export const selectPaymentById = (state, paymentId) => {
  // console.log('state.payments..selector.', state.payments);
  let updatedState = state.payments.payments.find((payment) => payment.id === paymentId)
  // console.log('state.payments..selector...1...', updatedState);
  return updatedState;
}
  
export default reducer
