import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
// @ts-ignore
import LogoutDialog from '../files/dialogs/LogoutDialog'

function Navbar2() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };
    const handleLogout = async () => {
        localStorage.removeItem('token');
        closeDialog();
        navigate('/');
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6">
                    SSI Projekt 2023
                </Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={openDialog}
                >
                    Wyloguj
                </Button>
            </Toolbar>
            <LogoutDialog
                open={dialogOpen}
                handleClose={closeDialog}
                handleLogout={handleLogout}
            />
        </AppBar>
    );
}
export default Navbar2;
