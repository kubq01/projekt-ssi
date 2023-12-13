import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
// @ts-ignore
import { Product } from '../Product.tsx';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import Navbar2 from '../../components/Navbar2.tsx';
// @ts-ignore
import Footer from '../../../src/components/Footer.tsx'

const ResourceManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        categoryId: 0,
        name: '',
        price: 0,
        rating: 0,
    });
    const [editedProduct, setEditedProduct] = useState<Product>({
        id: 0,
        categoryId: 0,
        name: '',
        price: 0,
        rating: 0,
    });
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:8083/product/allall';
    const navigate = useNavigate();

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
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiUrl, token]);

    const addProduct = async () => {
        try {
            const response = await fetch('http://localhost:8083/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Product added successfully');

            navigate(0);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const editProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8083/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedProduct),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Product edited successfully');

            navigate(0);
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const deleteProduct = async (deleteProd: Product) => {
        try {
            const response = await fetch(`http://localhost:8083/product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(deleteProd),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Product deleted successfully');

            navigate(0);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Container>
            <Navbar2 />
            <Typography style={{marginTop: '2vw'}} variant="h5" gutterBottom>
                Zarządzanie zasobami
            </Typography>
            <hr />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2, borderColor: 'primary.main', border: 1, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Wszystkie produkty
                        </Typography>
                        <hr />
                        <List>
                            {products.map((product) => (
                                <ListItem key={product.id} divider>
                                    <ListItemText
                                        primary={`Nazwa: ${product.name}`}
                                        secondary={`ID: ${product.id}, Cena: ${product.price}, Ocena: ${product.rating}`}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => setEditedProduct(product)}
                                    >
                                        Edytuj
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteProduct(product)}
                                    >
                                        Usuń
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Typography style={{marginTop: '2vw'}}  variant="h5" gutterBottom>
                Dodaj/Edytuj produkt
            </Typography>
            <Grid container spacing={2} style={{ marginBottom: '3vw' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ p: 2, borderColor: 'primary.main', border: 1, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Dodaj nowy produkt
                        </Typography>
                        <hr />
                        <TextField
                            label="ID Kategorii"
                            type="number"
                            value={newProduct.categoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Nazwa"
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Cena"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Ocena"
                            type="number"
                            value={newProduct.rating}
                            onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={addProduct}>
                            Dodaj produkt
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ p: 2, borderColor: 'primary.main', border: 1, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Edytuj produkt
                        </Typography>
                        <hr />
                        <TextField
                            label="ID"
                            type="number"
                            value={editedProduct.id}
                            onChange={(e) => setEditedProduct({ ...editedProduct, id: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Nazwa"
                            type="text"
                            value={editedProduct.name}
                            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Cena"
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Ocena"
                            type="number"
                            value={editedProduct.rating}
                            onChange={(e) => setEditedProduct({ ...editedProduct, rating: parseFloat(e.target.value) })}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={editProduct}>
                            Zapisz zmiany
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Button
                style={{ marginTop: '2vw', marginBottom: '2vw' }}
                variant="contained"
                color="primary"
                onClick={() => navigate('/adminpanel')}
                size="large"
                width="40%"
                sx={{
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    border: 0,
                    borderRadius: 3,
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    color: 'white',
                    height: 48,
                    padding: '0 30px',
                }}
            >
                Wróć do menu
            </Button>

            <Footer/>
        </Container>
    );
};

export default ResourceManagement;
