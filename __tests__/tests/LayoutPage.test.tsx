import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import LayoutPage from '../../src/pages/LayoutPage/LayoutPage';
import { AuthContext } from '../../src/controllers/appControllers';

const mockAuthContext = {
  isAuth: true,
};

describe('Test LayoutPage', () => {
  it('click Sign In', async () => {
    render(
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
    );
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
        <AuthContext.Provider value={mockAuthContext}>
          <LayoutPage />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const signOut = screen.getByText(/Sign Out/i);
    expect(signOut).toBeInTheDocument();
  });
});
