import { configureStore } from '@reduxjs/toolkit';
import { usersBuildingSlice } from './userBuildingSlice';

export const store = configureStore({
  reducer: {
    usersBuildings: usersBuildingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
