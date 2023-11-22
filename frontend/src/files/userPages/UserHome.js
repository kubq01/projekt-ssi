import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from "../User";

export default function UserHome() {
    const [userData, setUserData] = useState <User>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('http://localhost:8080/user?action=getUserById&id=1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': token,
                },
            })
                .then(response => response.json())
                .then(data => setUserData(data))
                .catch(error => console.error('Error:', error));
        }
    }, []);

    return (
        <div>
            <h1>Jesteś zalogowany jako użytkownik</h1>
            {userData && (
                <div>
                    <p>Imię: {userData.firstName}</p>
                    <p>Nazwisko: {userData.lastName}</p>
                    <p>Data urodzenia: {userData.dateOfBirth}</p>
                    <p>Login: {userData.login}</p>
                    <p>Email: {userData.email}</p>
                    <p>Rola: {userData.role}</p>
                </div>
            )}
        </div>
    );
}
