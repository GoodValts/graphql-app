import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import LayoutPage from '../../src/pages/LayoutPage/LayoutPage';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn() as jest.Mock,
}));

describe('Test LayoutPage', () => {
  it('click Sign In', async () => {
    render(
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
    );
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);
    const signInBtn = screen.getByText(/Sign In/i);
    const user = userEvent.setup();
    user.click(signInBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/login');
    });
  });
  it('click Sign Up', async () => {
    render(
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
    );
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);
    const signUpBtn = screen.getByText(/Sign Up/i);
    const user = userEvent.setup();
    user.click(signUpBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/registration');
    });
  });
  it('Checking if the user is authorized there is a button Sign Out ', async () => {
    render(
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
    );
    (useAuthState as jest.Mock).mockReturnValue([
      {
        user: {
          displayName: 'John Doe',
          email: 'johndoe@example.com',
        },
        loading: false,
        error: null,
      },
    ]);
    const signOut = screen.getByText(/Sign Out/i);
    expect(signOut).toBeInTheDocument();
  });
});
