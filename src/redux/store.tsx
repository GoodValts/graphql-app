import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './reducers/auth';
import settingsReducer from './reducers/settings';

export const reducers = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootReducer = ReturnType<typeof reducers>;

setupListeners(store.dispatch);

export const selectLanguage = (state: RootState): string =>
  state.settings.language;
export const selectEndpoint = (state: RootState): string =>
  state.settings.endpoint;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
