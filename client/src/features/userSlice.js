import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase();
  },
});
