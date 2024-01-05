import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn().mockReturnValue([
    {
      user: {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
      },
      loading: false,
      error: null,
    },
  ]),
}));

describe('Test App', () => {
  it('render App', () => {
    render(<App />);
    expect(window.location.pathname).toEqual('/');
  });
  it('Checking if the user is authorized there is a button Sign Out ', async () => {
    render(<App />);
    const signOut = screen.getByText(/Sign Out/i);
    expect(signOut).toBeInTheDocument();
  });
});
