import './App.css';
import Login from "./files/Login";
import Register from "./files/Register";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./files/Home";
import UserHome from "./files/userPages/UserHome";
import FavouritesPage from "./files/userPages/FavouritesPage";

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
            </Routes>
        </Router>
    </div>
  );
}

export default App;
