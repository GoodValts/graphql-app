import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import NotFoundPage from './pages/404/404';
import GraphQLPage from './pages/GraphQL/graphQL';
import RegistrationPage from './pages/Registration/registration';
import WelcomePage from './pages/WelcomePage/welcome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Header />
      <main>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/graphQL" element={<GraphQLPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<RegistrationPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </main>
      <Footer />
    </>
  )
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
