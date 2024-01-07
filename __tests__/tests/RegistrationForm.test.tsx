import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../src/controllers/appControllers';
import RegistrationForm from '../../src/components/Forms/RegistrationForm/registrationForm';

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
          <RegistrationForm />
        </BrowserRouter>
      </AuthProvider>
    );
    const nameInput = screen.getByTestId('name');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    const submitButton = screen.getByText(/submit/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('click submit', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <RegistrationForm />
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
});
