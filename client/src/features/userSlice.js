import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

const initialState = usersAdapter.getInitialState({
  users: [],
  status: 'idle',
  error: null,
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/users');

    return data;
  } catch (error) {
    return error.message;
  }
});

export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/users',
        newUser
      );

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${userData.id}`,
        userData
      );

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/${userId}`
      );

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const id = action.payload._id;
        usersAdapter.removeOne(state, id);
        state.users = state.users.filter((user) => user._id !== id);
      });
  },
});

export default userSlice.reducer;
