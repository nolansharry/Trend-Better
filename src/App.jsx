import {BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from './components/UserProfile';


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserProile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
