import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";
import Login from "./pages/login";
import Register from "./pages/register";
import Landing from "./pages/landing";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        
            <div className="app-container">
                <aside className="main-sidebar-area">
                    <Sidebar />
                </aside>

                <main className="main-content-area">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/settings/*" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        
    );
}