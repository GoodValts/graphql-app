import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/errorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './controllers/appControllers';
import appStore from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={appStore}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
