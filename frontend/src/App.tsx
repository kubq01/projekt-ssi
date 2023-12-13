import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';// @ts-ignore
import Login from "./files/Login.tsx";// @ts-ignore
import Register from "./files/Register.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// @ts-ignore
import Home from "./files/Home.tsx";// @ts-ignore
import UserHome from "./files/userPages/UserHome.tsx";// @ts-ignore
import FavouritesPage from "./files/userPages/FavouritesPage.tsx";// @ts-ignore
import AdminPanel from "./files/adminPages/AdminPanel.tsx";// @ts-ignore
import UserManagement from "./files/adminPages/UserManagement.tsx";// @ts-ignore
import ResourceManagement from "./files/adminPages/ResourceManagement.tsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f4f5f7',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#555555',
        }
    },
    typography: {
        fontFamily: [
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        h1: {
            fontSize: '2.2rem',
        },
        body1: {
            fontSize: '1rem',
        },
    },
});

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
