import{ useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {User} from "../User.tsx";
import FavouritesPage from "./FavouritesPage.tsx";
import ProductPage from "./ProductPage.tsx";
import Navbar2 from "../../components/Navbar2.tsx";

export default function UserHome() {
    const [userData, setUserData] = useState <User>({id: 0,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        login: '',
        password: '',
        email: '',
        role: '',
        favourites: [],
        isUserBlocked: false});

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            console.log(token)
            fetch('http://localhost:8083/user/my_profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUserData(data)
                    console.log(data)
                })
                .catch(error => console.error('Error:', error));
        }
    }, []);

    return (
        <div>
            <Navbar2/>
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
            <div>
                <FavouritesPage favouritesUser={userData.favourites}/>
            </div>
            <div>
                <ProductPage favouritesUser={userData.favourites}/>
            </div>
        </div>
    );
}
