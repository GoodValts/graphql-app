import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <main>
      {/* <Route path="/" element={<MainPage />}>
        <Route path="frontpage=:page&details=:id" element={<DetailBlock />} />
      </Route>






      <Route path="/page=:pageNumber" element={<MainPage />} />
      <Route path="/*" element={<ErrorPage />} /> */}
    </main>
  )
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
