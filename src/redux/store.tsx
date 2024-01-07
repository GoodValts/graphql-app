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

export const setupStore = (
  preloadedState?: Partial<RootReducer>
): typeof store => {
  return configureStore({
    reducer: reducers,
    preloadedState,
  });
};

export type RootReducer = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;

setupListeners(store.dispatch);
