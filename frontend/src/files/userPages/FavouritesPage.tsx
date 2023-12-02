import { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Product} from "../Product";
import {Favourites} from "../Favourites";

export default function FavouritesPage({favouritesUser}) {

    const navigate = useNavigate();
    const [favouriteProducts,setFavouriteProducts] = useState<Favourites[]>([]);
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            console.log(favouritesUser)
            const fetchData = async () => {
                try {
                    const favouritesPromises = favouritesUser.map(async (fav) => {
                        const response = await fetch(`http://localhost:8083/favourite?id=${fav.id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                                'Access-Control-Allow-Origin': 'http://localhost:3000',
                            },
                        });
                        if (!response.ok) {
                            throw new Error(`Failed to fetch favourite product with id ${fav.id}`);
                        }

                        const responseData = await response.json();
                        console.log(responseData);
                        // Pobierz szczegóły produktów dla każdego productId z ulubionych
                        const productIds = responseData.productId
                        console.log(productIds)
                        const response2 = await fetch(`http://localhost:8083/product?id=${productIds}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                                'Access-Control-Allow-Origin': 'http://localhost:3000',
                            },
                        });
                        if (!response.ok) {
                            throw new Error(`Failed to fetch product with id ${productIds}`);
                        }


                        const product = await response2.json();
                        setProducts((prevProducts) => [...prevProducts, product])
                    });



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