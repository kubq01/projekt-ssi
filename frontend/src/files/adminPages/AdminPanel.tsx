// src/components/AdminPanel.js
import { Link } from 'react-router-dom';
import { Paper, Grid, Container, Typography, Button } from '@mui/material';
// @ts-ignore
import Navbar2 from "../../components/Navbar2.tsx";
// @ts-ignore
import Footer from "../../../src/components/Footer.tsx";

const AdminPanel = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar2 />
            <Container sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Panel Administratora
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h5" gutterBottom>
                                    Zarządzanie Zasobami
                                </Typography>
                                <Typography variant="body1">
                                    Tutaj możesz zarządzać zasobami w systemie.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    href="/adminpanel/resources"
                                >
                                    Przejdź do zarządzania zasobami
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h5" gutterBottom>
                                    Zarządzanie Użytkownikami
                                </Typography>
                                <Typography variant="body1">
                                    Tutaj możesz zarządzać użytkownikami systemu.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    href="/adminpanel/users"
                                >
                                    Przejdź do zarządzania użytkownikami
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </div>
    );
};

export default AdminPanel;