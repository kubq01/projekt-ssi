import { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Product} from "../Product.tsx";
import {Favourites} from "../Favourites.tsx";
import {Button} from "@mui/material";

export default function FavouritesPage({favouritesUser}) {

    const navigate = useNavigate();
    const [favouriteProducts,setFavouriteProducts] = useState<Favourites[]>([]);
    const [products,setProducts] = useState<Product[]>([]);
    const [productStop, setProductStop] = useState<Product>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(products.length>0)
            return;
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
                        if(productStop == null)
                            setProductStop(product)
                        else if(productStop.id == product.id)
                            return
                        setProducts((prevProducts) => [...prevProducts, product])
                    });



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
        <div>
            <h1>Favourite Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {`Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Rating: ${product.rating}`}
                        <Button onClick={() => handleButtonClick(product)}>
                            Remove</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}