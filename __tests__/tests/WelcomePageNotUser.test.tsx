import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/controllers/appControllers';
import WelcomePage from '../../src/pages/WelcomePage/welcome';

const mockAuthContext = {
  isAuth: false,
  lang: 'en',
  setLang: (): void => {},
};

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null]),
}));

describe('Test WelcomePage user not exist', () => {
  test('user not exist click login', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <WelcomePage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const navToLogin = screen.getByTestId('navToLogin');
    fireEvent.click(navToLogin);
    expect(window.location.pathname).toEqual('/login');
  });
  test('user not exist click login', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <WelcomePage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const navToRegistration = screen.getByTestId('navToRegistration');
    fireEvent.click(navToRegistration);
    expect(window.location.pathname).toEqual('/registration');
  });
});
