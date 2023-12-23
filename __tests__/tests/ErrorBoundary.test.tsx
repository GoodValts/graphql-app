import { render } from '@testing-library/react';
import ErrorBoundary from '../../src/components/ErrorBoundary/errorBoundary';

describe('Test ErrorBoundary', () => {
  it('error text when error in the page', () => {
    const ErrorThrowingComponent = (): JSX.Element => {
      throw new Error('Test error');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const errorText = getByText(
      /Something went wrong. Please, reload the page!/i
    );

    expect(errorText).toBeInTheDocument();
  });
});
