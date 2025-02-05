import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../src/controllers/appControllers';
import GraphQLPage from '../../src/pages/GraphQL/graphQL';
import renderWithProviders from '../../__test-helpers__/test-helpers';

const mockAuthContext = {
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

jest.mock('../../src/firebase/firebase.tsx', () => ({
  auth: {},
}));

jest.mock('../../src/utils/api.ts', () => ({
  makeRequest: jest.fn().mockResolvedValue({
    characters: {
      results: [
        {
          name: 'Rick Sanchez',
          status: 'Alive',
        },
        {
          name: 'Adjudicator Rick',
          status: 'Dead',
        },
      ],
    },
  }),
  getIntrospectionSchema: jest.fn().mockResolvedValue('Docs here'),
}));
jest.mock('graphql', () => ({
  printSchema: jest.fn().mockReturnValue('Docs here'),
}));

describe('Test GraphQLPage', () => {
  it('click docs btn', async () => {
    renderWithProviders(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <GraphQLPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const docsBtn = screen.getByTestId('docs-btn');
    const user = userEvent.setup();
    user.click(docsBtn);
    await waitFor(() => {
      const docs = screen.getByTestId('docs');
      expect(docs).toBeInTheDocument();
    });
  });
});
