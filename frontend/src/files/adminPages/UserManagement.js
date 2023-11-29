import React, { useState, useEffect } from 'react';
import User from "../User";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:8080/getNotAdmins';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrl, token]);

    const promoteToAdmin = async (user: User) => {
        user.role = "ADMIN"
        try {
            const response = await fetch('http://localhost:8080/user?action=updateUser&id=' + user.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Password changed successfully`);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const toggleUserBlockStatus = async (user: User) => {
        user.isBlocked = !user.isBlocked
        try {
            const response = await fetch('http://localhost:8080/user?action=updateUser&id=' + user.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Password changed successfully`);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const changeUserPassword = async (user: User) => {
        user.password = newPassword
        try {
            const response = await fetch('http://localhost:8080/user?action=updateUser&id=' + user.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Password changed successfully`);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} - {user.email}
                        <button onClick={() => promoteToAdmin(user)}>Promote to Admin</button>
                        <button onClick={() => toggleUserBlockStatus(user)}>
                            {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <div>
                            <input
                                type="text"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button onClick={() => changeUserPassword(user)}>Change Password</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
