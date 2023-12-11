import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/errorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ContentProvider } from './controllers/ContentProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* <ContentProvider> */}
      <App />
      {/* </ContentProvider> */}
    </ErrorBoundary>
  </React.StrictMode>
);
