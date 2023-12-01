import { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function FavouritesPage({favouritesId}) {

    const navigate = useNavigate();
    const [favouriteProducts,setFavouriteProducts] = useState('');
    const [products,setProducts] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    const favouritesPromises = favouritesId.map(async (id) => {
                        const response = await fetch(`/favourite?action=get&id=${id}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch favourite product with id ${id}`);
                        }
                        return response.json();
                    });

                    const favourites = await Promise.all(favouritesPromises);
                    setFavouriteProducts(favourites);

                    // Pobierz szczegóły produktów dla każdego productId z ulubionych
                    const productIds = favourites.map((favourite) => favourite.productId);
                    const productsPromises = productIds.map(async (productId) => {
                        const response = await fetch(`/product?action=getProductById&id=${productId}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch product with id ${productId}`);
                        }
                        return response.json();
                    });

                    const products = await Promise.all(productsPromises);
                    setProducts(products);


                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [])

    return (
        <div>
            <h1>Favourite Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {`Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Rating: ${product.rating}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}