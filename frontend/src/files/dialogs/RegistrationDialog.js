import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function RegistrationDialog({ open, handleClose, success, message }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{success ? "Sukces" : "Błąd"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Zamknij
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RegistrationDialog;
