import { useState, useEffect } from 'react';
import { Grid, Paper, Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
// @ts-ignore
import Product from "../Product.tsx";
import { useNavigate } from 'react-router-dom';
import {Favourites} from "../Favourites";

export default function FavouritesPage({favouritesUser}) {

    const navigate = useNavigate();
    const [favouriteProducts,setFavouriteProducts] = useState<Favourites[]>([]);
    const [products,setProducts] = useState<Product[]>([]);
    const [productStop, setProductStop] = useState<Product>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(products.length>=favouritesUser.length)
            return;
        if (!token) {
            navigate('/login');
        } else {
            console.log(favouritesUser)
            console.log("useEffect is running");
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:8083/product/fav', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'Access-Control-Allow-Origin': 'http://localhost:3000',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }

                    const responseData = await response.json();
                    setProducts(responseData);
                    //console.log(responseData)
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    },[favouritesUser])

    const handleButtonClick = async (product) => {
        // Your custom logic when the button is clicked with the product parameter
        console.log(`Button clicked for Product ID ${product.id}`);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8083/favourite?id=${product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        });

        navigate(0)
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2, borderColor: 'primary.main', border: 1, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Ulubione produkty
                        </Typography>
                        <hr/>
                        <List>
                            {products.map((product) => (
                                <ListItem key={product.id} divider>
                                    <ListItemText
                                        primary={`Nazwa: ${product.name}`}
                                        secondary={`ID: ${product.id}, Cena: ${product.price}, Ocena: ${product.rating}`}
                                    />
                                    <Button variant="outlined" color="error" onClick={() => handleButtonClick(product)}>
                                        Usuń
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );

}