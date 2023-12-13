import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Box, Typography, Paper } from '@mui/material';

function Home() {
    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={3} style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Witaj na stronie głównej
                    </Typography>
                    <hr />
                    <Box display="flex" flexDirection="column" alignItems="center" marginTop="2rem">
                        <Button
                            component={RouterLink}
                            to="/login"
                            variant="contained"
                            color="primary"
                            style={{ marginBottom: '1rem' }}
                        >
                            Przejdź do logowania
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/register"
                            variant="outlined"
                            color="secondary"
                        >
                            Przejdź do rejestracji
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Home;
