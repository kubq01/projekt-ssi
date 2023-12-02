import { useState, useEffect } from 'react';
import {User} from "../User.tsx";
import {useNavigate} from "react-router-dom";
import Navbar2 from "../../components/Navbar2.tsx";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:8083/user/getNotAdmins';
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsers(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrl, token]);

    const promoteToAdmin = async (user: User) => {
        user.role = "ADMIN"
        try {
            const response = await fetch('http://localhost:8083/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate(0)
            console.log(`Password changed successfully`);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const toggleUserBlockStatus = async (user: User) => {
        user.isUserBlocked = !user.isUserBlocked
        user.blocked = !user.blocked
        user.userBlocked = !user.userBlocked
        console.log(JSON.stringify(user))
        //alert(JSON.stringify(user))
        try {
            const response = await fetch('http://localhost:8083/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Password changed successfully`);
            navigate(0)
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const changeUserPassword = async (user: User) => {
        user.password = newPassword
        try {
            const response = await fetch('http://localhost:8083/user/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate(0)
            console.log(`Password changed successfully`);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <div>
            <Navbar2/>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.email}>
                        {user.firstName} {user.lastName} - {user.email}
                        <button onClick={() => promoteToAdmin(user)}>Promote to Admin</button>
                        <button onClick={() => toggleUserBlockStatus(user)}>
                            {user.userBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <div>
                            <input
                                type="text"
                                placeholder="New Password"
                                id={user.email}
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
