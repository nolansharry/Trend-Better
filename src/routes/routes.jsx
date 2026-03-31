import Layout from "../pages/Layout";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Landing from "../pages/public/Landing";
import Settings from "../pages/private/Settings";

export const routes = [
  // Public routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    index: true,
    element: <Landing />,
},

  // Layout routes
  {
    path: "/",
    element: <Layout />,
    children: [
      
      {
        path: "settings/*",
        element: <Settings />,
      },
    ],
  },
];