import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_URL from '../../../../config';

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const fetchUser = createAsyncThunk('user/fetchUser', async ({ username, password }) => {
  const URL = `${API_URL}/v1/sign-in`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
  await delay(2000);
  return response;
});

const userSchema = {
  profile: {
    token: 123456,
    userName: 'idle',
    employeeId: 'idle',
    contactDetails: {
      email: 'idle',
      phone: 'idle',
    },
  },
  access: {
    role: 'idle',
    permissions: {
      canViewClients: false,
      canViewAssets: false,
      canViewSensors: false,
      canViewReports: false,
      canViewDiagnosis: false,
      canViewDashboard: false,
      canViewUsers: false,
      canViewSettings: false,
      canViewProfile: false,
      canViewHelp: false,
      canViewLogout: false,
    },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: userSchema,
    status: 'idle',
    error: null,
  },
  reducers: {
    // changeUserName: (state, action) => {
    //   state.user.name = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = {
          profile: {
            ...userSchema.profile,
            ...action.payload.data.profile,
          },
          access: {
            role: action.payload.data.access.role,
            permissions: {
              ...userSchema.access.permissions,
              ...action.payload.data.access.permissions,
            },
          },
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { changeUserName } = userSlice.actions;
