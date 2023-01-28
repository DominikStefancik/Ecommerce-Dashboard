import { createSlice, configureStore, SliceCaseReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { ThemeMode } from '@local/pages/theme/theme';
import { api } from './api/api';

export interface State {
  themeMode: ThemeMode;
  userId: string; // represents the id of a user who is currently logged in
  year: number; // represents a year which is currently selected
  month: string; // represents a month which is currently selected
  day: string; // represents a day which is currently selected
}

const initialState: State = {
  themeMode: ThemeMode.dark,
  userId: '63701cc1f03239b7f700000e',
  year: 2021,
  month: 'November',
  day: '2021-11-15',
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
