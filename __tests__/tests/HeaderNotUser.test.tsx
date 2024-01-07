import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../src/components/Header/header';
import AuthProvider from '../../src/controllers/appControllers';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn().mockReturnValue([null]),
}));

describe('Test Header not user', () => {
  it('click registration btn', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    );
    const regMobileBtn = screen.getByTestId('mobile-btn-reg');
    const user = userEvent.setup();
    user.click(regMobileBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/registration');
    });
  });
  it('click login btn', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    );
    const loginMobileBtn = screen.getByTestId('mobile-btn-login');
    const user = userEvent.setup();
    user.click(loginMobileBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/login');
    });
  });
});
