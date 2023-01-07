import { createSlice, configureStore, SliceCaseReducers } from '@reduxjs/toolkit';

import { ThemeMode } from '../theme';
import { api } from './api/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export interface State {
  themeMode: ThemeMode;
  userId: string; // represents the id of a user who is currently logged in
}

const initialState: State = {
  themeMode: ThemeMode.dark,
  userId: '63701cc1f03239b7f700000e',
};

export const globalSlice = createSlice<State, SliceCaseReducers<State>, string>({
  name: 'global',
  initialState,
  reducers: {
    setTheme: (state: State) => {
      state.themeMode = state.themeMode === ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    },
  },
});

export const store = configureStore({
  reducer: { global: globalSlice.reducer, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export const { setTheme } = globalSlice.actions;
