import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-container">
      <aside className="main-sidebar-area">
        <Sidebar />
      </aside>

      <main className="main-content-area">
        <Outlet />
      </main>
    </div>
  );
}