import { current } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/controllers/appControllers';
import WelcomePage from '../../src/pages/WelcomePage/welcome';

const mockAuthContext = {
  isAuth: false,
  lang: 'en',
  setLang: (): void => {},
};

const mockAuthContextUser = {
  isAuth: true,
  lang: 'en',
  setLang: (): void => {},
};

describe('Test WelcomePage', () => {
  // it('user not exist', async () => {
  //   jest.mock('react-firebase-hooks/auth', () => ({
  //     useAuthState: jest.fn(() => [null]),
  //   }));
  //   render(
  //     <AuthContext.Provider value={mockAuthContext}>
  //       <BrowserRouter>
  //         <WelcomePage />
  //       </BrowserRouter>
  //     </AuthContext.Provider>
  //   );
  //   const navToLogin = screen.getByTestId('navToLogin');
  //   const navToRegistration = screen.getByTestId('navToRegistration');
  //   expect(navToLogin).toBeInTheDocument();
  //   expect(navToRegistration).toBeInTheDocument();
  // });
  // it('user exist', async () => {
  //   jest.mock('react-firebase-hooks/auth', () => ({
  //     useAuthState: jest.fn().mockReturnValue([
  //       {
  //         user: {
  //           displayName: 'Vasya',
  //           email: 'Vasya@tut.byl',
  //         },
  //         loading: false,
  //         error: null,
  //       },
  //     ]),
  //   }));
  //   render(
  //     <AuthContext.Provider value={mockAuthContextUser}>
  //       <AuthContext>
  //         <BrowserRouter>
  //           <WelcomePage />
  //         </BrowserRouter>
  //       </AuthContext>
  //     </AuthContext.Provider>
  //   );
  //   const navToGraphQL = screen.getByTestId('navToGraphQL');
  //   expect(navToGraphQL).toBeInTheDocument();
  // });
});
