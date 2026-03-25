import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";


function App(){
  return(
      <Routes>
        <Route path="/" element={<UserProfile />} />
      </Routes>
  );
}

export default App;
