import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ bgcolor: 'grey.200', color: 'text.primary', py: 3 }}>
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h6" gutterBottom>
                            Projekt SSI
                        </Typography>
                        <Typography>
                            © {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
                        <Typography fontWeight="bold">Projekt wykonali:</Typography>
                        <Typography>Filip Zagulak, Jakub Ossoliński</Typography>
                        <Typography>Jakub Brzeżański, Wojtek Szewczyk</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
