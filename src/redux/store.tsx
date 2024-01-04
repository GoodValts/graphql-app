/* import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import settingsReducer from './reducers/settings';

export const reducers = combineReducers({
  settings: settingsReducer,
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
  state.settings.endpoint; */
import { configureStore } from '@reduxjs/toolkit';
import endpointReducer from './reducers/endpointSlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
