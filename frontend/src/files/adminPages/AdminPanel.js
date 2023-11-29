// src/components/AdminPanel.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div>
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