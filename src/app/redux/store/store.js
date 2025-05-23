import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import reduxLogger from 'redux-logger';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
});

export default store;
