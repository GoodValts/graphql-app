import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/controllers/appControllers';
import LoginPage from '../../src/pages/LoginPage/login';

const mockAuthContextRu = {
  isAuth: false,
  lang: 'ru',
  setLang: (): void => {},
};

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null]),
}));

jest.mock('../../src/firebase/firebase.tsx', () => ({
  auth: {},
}));

describe('Test LoginPage', () => {
  it('render LoginPage', async () => {
    render(
      <AuthContext.Provider value={mockAuthContextRu}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByText(/войти/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
