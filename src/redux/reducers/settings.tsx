/* import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsInitialStateTypes {
  language: string;
  endpoint: string;
}

const initialState: SettingsInitialStateTypes = {
  language: localStorage.getItem('lang') || 'en',
  endpoint:
    localStorage.getItem('endpoint') ||
    'https://graphql.github.io/swapi-graphql',
};

export const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
  },
});

export const { setLanguage, setEndpoint } = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer; */
