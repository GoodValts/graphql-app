import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './errorBoundary.module.scss';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): React.ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <h1 className={styles.header}>
          Something went wrong. Please, reload the page!
        </h1>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
