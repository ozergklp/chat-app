// store.ts
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './Features/chatSlice';

const store = configureStore({
  reducer: {
    chatState: chatReducer,
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
