import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Przykładowa ścieżka do Twojego backendu
        const apiUrl = 'http://localhost:8080/api/register'; // Zastąp odpowiednią ścieżką

        try {
            const response = await axios.post(apiUrl, {
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                login: login,
                password: password,
                email: email,
                role: role,
            });

            if (response.data.success) {
                // Tutaj możesz obsłużyć sukces rejestracji, np. przekierować użytkownika
                alert('Zarejestrowano pomyślnie!');
            } else {
                // Tutaj możesz obsłużyć błędy rejestracji, np. wyświetlić komunikat o błędzie
                alert('Błąd rejestracji. Spróbuj ponownie.');
            }
        } catch (error) {
            // Tutaj obsługuj błędy związane z żądaniem HTTP
            console.error('Błąd rejestracji:', error);
            alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Formularz Rejestracji</h2>
                    <hr />
                    <form onSubmit={handleRegistration}>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="firstName">Imię:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="lastName">Nazwisko:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Data urodzenia:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateOfBirth"
                                    value={dateOfBirth}
                                    onChange={(event) => setDateOfBirth(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="login">Login:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="login"
                                    placeholder="Enter Login"
                                    value={login}
                                    onChange={(event) => setLogin(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="password">Hasło:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="role">Rola:</label>
                                <select
                                    className="form-control"
                                    id="role"
                                    value={role}
                                    onChange={(event) => setRole(event.target.value)}
                                    required
                                >
                                    <option value="">Wybierz rolę</option>
                                    <option value="user">Użytkownik</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">
                                Zarejestruj
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/" className="btn btn-secondary">
                                Wróć do strony głównej
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
