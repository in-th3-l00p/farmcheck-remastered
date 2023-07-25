import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext, {useAuthContext} from './context/AuthContext';
import Login from './route/Login';
import Register from './route/Register';
import Farms from './route/farms/All';
import CreateFarm from './route/farms/Create';
import Farm from './route/farms/Display';
import Users from './route/farms/Users';
import Tasks from './route/tasks/Tasks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <></>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/farms",
    element: <Farms />
  },
  {
    path: "/farms/create",
    element: <CreateFarm />
  },
  {
    path: "/farms/:id",
    element: <Farm />
  },
  {
    path: "/farms/:id/users",
    element: <Users />
  },
  {
    path: "/farms/:id/tasks",
    element: <Tasks />
  }
]);

const App = () => {
  const auth = useAuthContext();
  return (
    <React.StrictMode>
      <AuthContext.Provider value={auth}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
