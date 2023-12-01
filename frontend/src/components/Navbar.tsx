import { Link, useLocation } from 'react-router-dom';
import Button from "bootstrap/js/src/button";
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const linkStyle = {
        margin: '0 5px',
    };
    const navigate = useNavigate();

    const shouldDisplayLogoutButton =
        (location.pathname === '/homeforemployee' ||
            location.pathname === '/userhome' ||
            location.pathname === '/favouritespage') ||
        false;

    const logoutUser = async () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    const shouldDisplayFavoritesButton = location.pathname === '/homeforclient';

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Elite Events Application
                    </Link>

                    <div className="ml-auto">
                        {shouldDisplayFavoritesButton && (
                            <Link to="/favouritespage" style={linkStyle} className="btn btn-outline-light">
                                Ulubione
                            </Link>
                        )}
                        {shouldDisplayLogoutButton ? (
                            <Button onClick={logoutUser}> </Button>
                        ) : (
                            <>
                                <Link to="/" style={linkStyle} className="btn btn-outline-light">
                                    Home
                                </Link>
                                <Link to="/login" style={linkStyle} className="btn btn-outline-light">
                                    Login
                                </Link>
                                <Link to="/register" style={linkStyle} className="btn btn-outline-light">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
