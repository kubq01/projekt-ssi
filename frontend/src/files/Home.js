import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h1 className="text-center m-4">Witaj na stronie głównej</h1>
                    <hr />
                    <div className="text-center">
                        <Link to="/login" className="btn btn-primary m-2">
                            Przejdź do logowania
                        </Link>
                        <Link to="/register" className="btn btn-secondary m-2">
                            Przejdź do rejestracji
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
