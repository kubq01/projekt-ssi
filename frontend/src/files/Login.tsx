import { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:8083/auth/authenticate';

        try {
            const response = await axios.post(apiUrl, {
                email: email,
                password: password,
            });



            if (response.data) {

                //alert(JSON.stringify(response.data))
                if(response.data.blocked == true) {
                    alert('Użytkownik zablokowany');
                    return;
                }
                alert('Zalogowano pomyślnie!');
                localStorage.setItem("token", response.data.accessToken)
                localStorage.setItem("role", response.data.role)
                if(localStorage.getItem("role") == "ADMIN") {
                    navigate("/adminpanel")
                } else {

                    navigate("/userhome")
                }
            } else {
                alert('Błąd logowania. Spróbuj ponownie.');
            }
        } catch (error) {
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
