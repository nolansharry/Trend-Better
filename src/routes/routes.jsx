import { useAuth } from "../context/AuthContext";
import Layout from "../pages/Layout";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Landing from "../pages/public/Landing";
import Home from "../pages/private/home";
import Feed from "../pages/private/Feed";
import Settings from "../pages/private/Settings";

// Optional: icons management through lucide-react
import {House, Settings as SettingsIcon, LogIn, UserPlus, User, Handshake} from "lucide-react";
import UserProfile from "../pages/private/UserProfile.jsx";

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
            path: "/feed",
            element: <Feed />,
            label: "Feed",
            icon: Handshake,
            showInNav: true,
        },
        {

            path: "/profile",
            element: <UserProfile />,
            label: "Profile",
            icon: User,
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