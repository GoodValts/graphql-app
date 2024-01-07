import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../src/controllers/appControllers';
import LoginForm from '../../src/components/Forms/LoginForm/loginForm';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null]),
}));

jest.mock('../../src/firebase/firebase.tsx', () => ({
  auth: {},
}));

describe('Test LoginForm', () => {
  it('render LoginForm', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </AuthProvider>
    );
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByText(/submit/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('click submit', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </AuthProvider>
    );
    const submit = screen.getByText(/submit/i);
    const user = userEvent.setup();
    user.click(submit);
    await waitFor(() => {
      const error = screen.getByText(/Email is a required field/);
      expect(error).toBeInTheDocument();
    });
  });
  it('click eye btn', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </AuthProvider>
    );
    const eyeBtn = screen.getByTestId('see-btn');
    const user = userEvent.setup();
    user.click(eyeBtn);
    await waitFor(() => {
      const passwordInput = screen.getByTestId('password') as HTMLInputElement;
      expect(passwordInput.type).toEqual('text');
    });
  });
});
