import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsInitialStateTypes {
  endpoint: string;
}

const initialState: SettingsInitialStateTypes = {
  endpoint:
    localStorage.getItem('endpoint') || 'https://rickandmortyapi.com/graphql',
};

export const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
  },
});

export const { setEndpoint } = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
