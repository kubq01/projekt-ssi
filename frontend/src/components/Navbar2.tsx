import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Button} from "@mui/material";

function Navbar2() {
    const linkStyle = {
        margin: '0 5px',
    };
    const navigate = useNavigate();

    const logoutUser = async () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <div className="ml-auto">
                        <Button onClick={logoutUser}> Logout </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar2;
