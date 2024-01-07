import React, { PropsWithChildren } from 'react';
import '@testing-library/jest-dom';
import {
  render,
  RenderHookOptions,
  RenderResult,
} from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { setupStore } from '../src/redux/store';
import type { RootReducer, AppStore } from '../src/redux/store';

interface INullType {}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootReducer>;
  store?: AppStore;
}

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): { store: AppStore; result: RenderResult } {
  function Wrapper({ children }: PropsWithChildren<INullType>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  const result = render(ui, { wrapper: Wrapper, ...renderOptions });
  return { store, result };
}
