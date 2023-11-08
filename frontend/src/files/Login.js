import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importuj Link z react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Przykładowa ścieżka do Twojego backendu
        const apiUrl = 'http://localhost:8080/api/login'; // Zastąp odpowiednią ścieżką

        try {
            const response = await axios.post(apiUrl, {
                email: email,
                password: password,
            });

            if (response.data.success) {
                // Tutaj możesz obsłużyć sukces logowania, np. przekierować użytkownika
                alert('Zalogowano pomyślnie!');
            } else {
                // Tutaj możesz obsłużyć błędne logowanie, np. wyświetlić komunikat o błędzie
                alert('Błąd logowania. Spróbuj ponownie.');
            }
        } catch (error) {
            // Tutaj obsługuj błędy związane z żądaniem HTTP
            console.error('Błąd logowania:', error);
            alert('Wystąpił błąd podczas logowania. Spróbuj ponownie później.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Formularz Logowania</h2>
                    <hr />
                    <form onSubmit={handleLogin}>
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
                            <button type="submit" className="btn btn-primary">
                                Zaloguj
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to="/" className="btn btn-secondary">
                            Wróć do strony głównej
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
