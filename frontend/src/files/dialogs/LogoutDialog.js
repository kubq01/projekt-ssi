import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function LogoutDialog({ open, handleClose, handleLogout }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Wylogowanie"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Czy na pewno chcesz się wylogować?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleLogout} color="primary">
                    Wyloguj
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutDialog;
