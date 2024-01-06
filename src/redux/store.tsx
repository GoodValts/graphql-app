/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import endpointReducer from './reducers/endpointSlice';

export const reducers = combineReducers({
  endpoint: endpointReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const setupStore = (preloadedState?: Partial<RootReducer>) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
  });
};

export type RootReducer = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;

setupListeners(store.dispatch);
