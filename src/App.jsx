import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Error, Landing, Register, ProtectedRoute } from './pages';
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from './pages/dashboard';

const App = function () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <SharedLayout />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Stats />,
        },
        {
          path: 'all-jobs',
          element: <AllJobs />,
        },
        {
          path: 'add-job',
          element: <AddJob />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: 'landing',
      element: <Landing />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ]);
  return (
    <div>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

/* 
  ! React-Router-Dom 6.0 Syntax
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { Error, Landing, Register, Dashboard } from './pages';

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Stats />} />
            <Route path='all-jobs' element={<AllJobs />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='landing' element={<Landing />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <ToastContainer position='top-center' />
      </BrowserRouter>
    );
  }
*/
