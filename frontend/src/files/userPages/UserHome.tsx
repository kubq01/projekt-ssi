import { useState, useEffect } from 'react';
import { Grid, Container, Paper, Typography, Box } from '@mui/material';
// @ts-ignore
import User from "../User.tsx";
// @ts-ignore
import FavouritesPage from "./FavouritesPage.tsx";
// @ts-ignore
import ProductPage from "./ProductPage.tsx";
// @ts-ignore
import Navbar2 from "../../components/Navbar2.tsx";
// @ts-ignore
import Footer from "../../components/Footer.tsx";

export default function UserHome() {
    const [userData, setUserData] = useState <User>({
        id: 0,
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
        <Container>
            <Navbar2 />
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Jesteś zalogowany jako użytkownik
                </Typography>
                <Paper elevation={3} sx={{ p: 2, my: 2, borderRadius: 2 }} style={{marginBottom: '4vw'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Informacje o użytkowniku
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Imię:</strong> {userData.firstName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Nazwisko:</strong> {userData.lastName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Data urodzenia:</strong> {userData.dateOfBirth}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Login:</strong> {userData.login}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Email:</strong> {userData.email}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Rola:</strong> {userData.role}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ProductPage favouritesUser={userData.favourites} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FavouritesPage favouritesUser={userData.favourites} />
                    </Grid>
                </Grid>
            </Box>
            <Footer/>
        </Container>
    );
}
