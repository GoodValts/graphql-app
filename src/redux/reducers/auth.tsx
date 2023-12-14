import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsInitialStateTypes {
  isAuth: boolean;
}

const initialState: SettingsInitialStateTypes = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
