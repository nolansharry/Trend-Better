import { useAuth } from "../context/AuthContext";
import Layout from "../pages/Layout";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Landing from "../pages/public/Landing";
import Home from "../pages/private/Home";
import Settings from "../pages/private/Settings";

// Optional: icons management through lucide-react
import { House, Settings as SettingsIcon, LogIn, UserPlus } from "lucide-react";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SETTINGS: "/settings",
};

export function useAppRoutes() {
    const { user } = useAuth();   

    return [
    // Public routes (no layout)
    {
        path: "/login",
        element: <Login />,
        label: "Login",
        icon: LogIn,
        showInNav: false,
    },
    {
        path: "/register",
        element: <Register />,
        label: "Register",
        icon: UserPlus,
        showInNav: false,
    },
    //Layout wrapper
    {
        path: "/",
        element: <Layout />,
        children: [
        {
            index: true,
            element: user ? <Home /> : <Landing />,
            label: "Home",
            icon: House,
            showInNav: true,
        },
        {
            path: "settings/*",
        element: <Settings />,
        label: "Settings",
        icon: SettingsIcon,
        showInNav: true,
      },
    ],
  },
];

};