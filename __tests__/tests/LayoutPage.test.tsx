import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LayoutPage from '../../src/pages/LayoutPage/LayoutPage';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn().mockReturnValue([null, false, null]),
}));

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
});
