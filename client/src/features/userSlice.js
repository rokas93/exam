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
    const { data } = await axios.get(`${process.env.REACT_APP_HOST}/api/users`);

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
        `${process.env.REACT_APP_HOST}/api/users`,
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
      const { _id } = userData;
      await axios.put(
        `${process.env.REACT_APP_HOST}/api/users/${_id}`,
        userData
      );

      return userData;
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
        `${process.env.REACT_APP_HOST}/api/users/${userId}`
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
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { _id } = action.payload;
        usersAdapter.removeOne(state, _id);
      });
  },
});

export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(
  (state) => state.users
);

export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export default userSlice.reducer;
