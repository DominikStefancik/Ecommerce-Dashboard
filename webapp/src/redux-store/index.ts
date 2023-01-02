import { ThemeMode } from '../theme';
import { createSlice } from '@reduxjs/toolkit';

export interface State {
  themeMode: ThemeMode;
}

const initialState: State = {
  themeMode: ThemeMode.dark,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTheme: (state: State) => {
      state.themeMode = state.themeMode === ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    },
  },
});

export const { setTheme } = globalSlice.actions;

export default globalSlice.reducer;
