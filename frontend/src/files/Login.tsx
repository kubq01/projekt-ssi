import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Paper, Typography, TextField, Button, Link } from '@mui/material';
import LoginDialog from "./dialogs/LoginDialog";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();

    const handleDialogClose = () => {
        setDialogOpen(false);

        if (loginSuccess) {
            if (localStorage.getItem("role") === "ADMIN") {
                navigate("/adminpanel");
            } else {
                navigate("/userhome");
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:8083/auth/authenticate';

        try {
            const response = await axios.post(apiUrl, { email, password });

            if (response.data) {
                if (response.data.blocked) {
                    alert('Użytkownik zablokowany');
                    return;
                }
                setDialogMessage('Pomyślnie się zalogowałeś');
                setLoginSuccess(true);
                setDialogOpen(true);
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("role", response.data.role);
            } else {
                setDialogMessage('Wystąpił problem podczas logowania');
                setLoginSuccess(false);
                setDialogOpen(true);
            }
        } catch (error) {
            console.error('Błąd logowania:', error);
            setDialogMessage('Wystąpił problem podczas logowania. Spróbuj ponownie później.');
            setLoginSuccess(false);
            setDialogOpen(true);
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={3} style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
                    <Typography variant="h5" component="h2" gutterBottom align="center">
                        Formularz Logowania
                    </Typography>
                    <hr />
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Hasło"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Box textAlign="center" marginTop="2rem">
                            <Button type="submit" variant="contained" color="primary">
                                Zaloguj
                            </Button>
                        </Box>
                    </form>
                    <Box textAlign="center" marginTop="2rem">
                        <Link component={RouterLink} to="/" color="secondary">
                            Wróć do strony głównej
                        </Link>
                    </Box>
                </Paper>
            </Box>
            <LoginDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                success={loginSuccess}
                message={dialogMessage}
            />
        </Container>
    );
}

export default Login;
