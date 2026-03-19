
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Settings from "./pages/Settings.jsx";
function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <aside className="sidebar-area">
            <Sidebar/>
        </aside>

        <main className="content-area">
            <Routes>
                <Route path="/" element={<div>Welcome to the home page</div>}/>
                <Route path="/Settings" element={<Settings/>}/>
            </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
