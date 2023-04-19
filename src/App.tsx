import 'antd/dist/reset.css';
import './App.css';
import { Button } from 'antd';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hello from './pages/Hello';
import { lazy } from 'react';

// import Demo from './pages/Demo';
const Demo = lazy(() => import('./pages/Demo'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>index</div>,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/hello",
    element: <Hello />,
  },
]);

console.log('[[app env]]:', {
  NODE_ENV: process.env.NODE_ENV,
  isDevelopment: process.env.isDevelopment,
  appVersion: process.env.appVersion,
});

const App = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
);

export default App;