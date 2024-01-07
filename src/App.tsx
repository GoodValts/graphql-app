import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import NotFoundPage from './pages/404/404';
import GraphQLPage from './pages/GraphQL/graphQL';
import RegistrationPage from './pages/RegistrationPage/registration';
import WelcomePage from './pages/WelcomePage/welcome';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import LoginPage from './pages/LoginPage/login';
import './App.scss';
import 'highlight.js/styles/a11y-light.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutPage />}>
      <Route index element={<WelcomePage />} />
      <Route path="/graphQL" element={<GraphQLPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Route>
  ),
  { basename: '/graphiql-app/' }
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
