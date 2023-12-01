import './App.css';
import Login from "./files/Login.tsx";
import Register from "./files/Register.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./files/Home.tsx";
import UserHome from "./files/userPages/UserHome.tsx";
import FavouritesPage from "./files/userPages/FavouritesPage.tsx";
import AdminPanel from "./files/adminPages/AdminPanel.tsx";
import UserManagement from "./files/adminPages/UserManagement.tsx";
import ResourceManagement from "./files/adminPages/ResourceManagement.tsx";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/favouritespage" element={<FavouritesPage />} />
                <Route path="/adminpanel" element={<AdminPanel />} />
                <Route path={"/adminpanel/users"} element={<UserManagement />} />
                <Route path={"/adminpanel/resources"} element={<ResourceManagement />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
