import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../src/components/Header/header';
import AuthProvider, {
  AuthContext,
} from '../../src/controllers/appControllers';

const mockAuthContextEn = {
  isAuth: false,
  lang: 'en',
  setLang: (): void => {},
};

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn().mockReturnValue([
    {
      user: {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
      },
      loading: false,
      error: null,
    },
  ]),
}));

describe('Test Header', () => {
  it('click GraphQL btn', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    );
    const graphqlBtn = screen.getByTestId('graphql-btn');
    const user = userEvent.setup();
    user.click(graphqlBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/graphQL');
    });
  });
  it('click sign out btn', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    );
    const singOut = screen.getByText(/sign out/i);
    const user = userEvent.setup();
    user.click(singOut);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
    });
  });
  it('save ru lang to Local Storage', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    );
    const ruBtn = screen.getByTestId('ru');
    fireEvent.click(ruBtn);
    setTimeout(() => {
      const localStorageValue = localStorage.getItem('lang');
      expect(localStorageValue).toBe('ru');
    }, 200);
  });
});
