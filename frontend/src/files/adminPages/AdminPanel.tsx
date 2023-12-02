// src/components/AdminPanel.js
import { Link } from 'react-router-dom';
import Navbar2 from "../../components/Navbar2.tsx";

const AdminPanel = () => {
    return (
        <div>
            <Navbar2/>
            <h2>Admin Panel</h2>
            <div>
                <Link to="/adminpanel/resources">
                    <button>Resource Management</button>
                </Link>
                <Link to="/adminpanel/users">
                    <button>User Management</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;