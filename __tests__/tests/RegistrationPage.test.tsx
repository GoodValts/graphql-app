import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/controllers/appControllers';
import RegistrationPage from '../../src/pages/RegistrationPage/registration';

const mockAuthContextRu = {
  lang: 'ru',
  setLang: (): void => {},
};

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null]),
}));

jest.mock('../../src/firebase/firebase.tsx', () => ({
  auth: {},
}));

describe('Test RegistrationPage', () => {
  it('render RegistrationPage', async () => {
    render(
      <AuthContext.Provider value={mockAuthContextRu}>
        <BrowserRouter>
          <RegistrationPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const nameInput = screen.getByTestId('name');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    const submitButton = screen.getByText(/создать/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
