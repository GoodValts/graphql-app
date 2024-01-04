import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EndpointState {
  value: string;
}

const initialState: EndpointState = {
  value:
    localStorage.getItem('endpoint') || 'https://rickandmortyapi.com/graphql',
};

export const endpointSlice = createSlice({
  name: 'endpoint',
  initialState,
  reducers: {
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setEndpoint } = endpointSlice.actions;

export default endpointSlice.reducer;
