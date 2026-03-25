import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";
import { useEffect } from "react";

// Define a simple Home component
const Home = () => (
    <div className="home-content">
        <h1 className="home-title">TrendBetter</h1>
    </div>
);

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
        <BrowserRouter>
            <div className="app-container">
                <aside className="main-sidebar-area">
                    <Sidebar />
                </aside>

                <main className="main-content-area">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/settings/*" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

