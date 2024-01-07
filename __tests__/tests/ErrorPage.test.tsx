import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../src/pages/404/404';

test('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
  render(
    <MemoryRouter initialEntries={['/error-path']} initialIndex={0}>
      <Routes>
        <Route path="error-path" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );
  const page404 = screen.getByText(/Page not found!/i);
  expect(page404).toBeInTheDocument();
});
