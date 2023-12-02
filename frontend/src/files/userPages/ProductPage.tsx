import { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Product} from "../Product.tsx";
import {Favourites} from "../Favourites.tsx";
import {Button} from "@mui/material";

export default function ProductPage({favouritesUser}) {

    const navigate = useNavigate();
    const [favouriteProducts,setFavouriteProducts] = useState<Favourites[]>([]);
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (products.length > 0) return;
        if (!token) {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:8083/product/all', {
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


    }, [navigate, products]);

    const handleButtonClick = async (product) => {
        // Your custom logic when the button is clicked with the product parameter
        console.log(`Button clicked for Product ID ${product.id}`);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8083/favourite?productId=${product.id}`, {
            method: 'POST',
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
            <h1>All Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {`Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Rating: ${product.rating}`}
                        <Button onClick={() => handleButtonClick(product)}>
                            Add to favourite</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}