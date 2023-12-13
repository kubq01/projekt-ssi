import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import RegistrationDialog from "./dialogs/RegistrationDialog";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const apiUrl = 'http://localhost:8083/auth/register';
        try {
            const response = await axios.post(apiUrl, {
                firstName,
                lastName,
                email,
                password,
                role: "USER",
            });

            if (response.data) {
                setDialogMessage('Udało się utworzyć konto');
                setRegistrationSuccess(true);
                setDialogOpen(true);

                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("role", response.data.role);
                navigate(localStorage.getItem("role") === "ADMIN" ? "/adminpanel" : "/userhome");
            } else {
                setDialogMessage('Konto o takim emailu już istnieje!!!');
                setRegistrationSuccess(false);
                setDialogOpen(true);
            }
        } catch (error) {
            console.error('Błąd rejestracji:', error);
            setDialogMessage('Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.');
            setRegistrationSuccess(false);
            setDialogOpen(true);
        }
    };

    return (
        <Container maxWidth="sm" style={{marginTop: '6vw'}}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Formularz Rejestracji
                </Typography>
                <form onSubmit={handleRegistration}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Imię"
                                variant="outlined"
                                fullWidth
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nazwisko"
                                variant="outlined"
                                fullWidth
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                label="Hasło"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Zarejestruj
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" color="secondary" fullWidth>
                                    Wróć do strony głównej
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <RegistrationDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                success={registrationSuccess}
                message={dialogMessage}
            />
        </Container>
    );
}

export default Register;
