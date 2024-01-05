import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/controllers/appControllers';
import WelcomePage from '../../src/pages/WelcomePage/welcome';

const mockAuthContextUser = {
  isAuth: true,
  lang: 'en',
  setLang: (): void => {},
};

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn().mockReturnValue([
    {
      user: {
        displayName: 'Vasya',
        email: 'Vasya@tut.byl',
      },
      loading: false,
      error: null,
    },
  ]),
}));

describe('Test WelcomePage user exist', () => {
  test('user exist', async () => {
    render(
      <AuthContext.Provider value={mockAuthContextUser}>
        <BrowserRouter>
          <WelcomePage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const navToGraphQL = screen.getByTestId('navToGraphQL');
    expect(navToGraphQL).toBeInTheDocument();
  });
});
