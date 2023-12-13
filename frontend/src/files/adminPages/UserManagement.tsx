import { useState, useEffect } from 'react';
import { IconButton, ButtonGroup, Typography, List, ListItem, ListItemText, Button, TextField, Container, Grid, Card, CardActions, CardContent, Avatar, Snackbar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
// @ts-ignore
import { User } from '../User.tsx';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import Navbar2 from '../../components/Navbar2.tsx';
// @ts-ignore
import Footer from '../../../src/components/Footer.tsx'

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:8083/user/getNotAdmins';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrl, token]);

    const promoteToAdmin = async (user: User) => {
        user.role = 'ADMIN';
        try {
            const response = await fetch('http://localhost:8083/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate(0);
            console.log(`Password changed successfully`);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const toggleUserBlockStatus = async (user: User) => {
        user.isUserBlocked = !user.isUserBlocked;
        user.blocked = !user.blocked;
        user.userBlocked = !user.userBlocked;
        console.log(JSON.stringify(user));
        //alert(JSON.stringify(user))
        try {
            const response = await fetch('http://localhost:8083/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Password changed successfully`);
            navigate(0);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const changeUserPassword = async (user: User) => {
        user.password = newPassword;
        try {
            const response = await fetch('http://localhost:8083/user/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate(0);
            console.log(`Password changed successfully`);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <Container>
            <Navbar2 />
            <Typography style={{marginTop: '3vw'}} variant="h4" gutterBottom>Lista użytkowników</Typography>
            <Grid container spacing={2} style={{ marginBottom: '14.8vw' }}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.email}>
                        <Card elevation={3}>
                            <CardContent>
                                <Avatar><PersonIcon /></Avatar>
                                <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
                                <Typography color="textSecondary">{user.email}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    color="primary"
                                    onClick={() => promoteToAdmin(user)}
                                >
                                    <VpnKeyIcon />
                                </IconButton>
                                <IconButton
                                    color={user.userBlocked ? 'success' : 'error'}
                                    onClick={() => toggleUserBlockStatus(user)}
                                >
                                    {user.userBlocked ? <LockOpenIcon /> : <BlockIcon />}
                                </IconButton>
                                <TextField
                                    label="New Password"
                                    type="password"
                                    size="small"
                                    value={newPassword}
                                    variant="outlined"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ marginRight: 8 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => changeUserPassword(user)}
                                >
                                    <VpnKeyIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </Container>
    );

};

export default UserManagement;
