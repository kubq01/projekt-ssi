import { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Product} from "../Product.tsx";
import {Favourites} from "../Favourites.tsx";
import {Button} from "@mui/material";
import Navbar2 from "../../components/Navbar2.tsx";

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
                    const favouritesPromises = favouritesUser.map(async (fav) => {

                        const response2 = await fetch(`http://localhost:8083/product?id=${fav.productId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                                'Access-Control-Allow-Origin': 'http://localhost:3000',
                            },
                        });
                        if (!response2.ok) {
                            throw new Error(`Failed to fetch product with id ${fav.productId}`);
                        }


                        const product = await response2.json();
                        if(productStop == null)
                            setProductStop(product)
                        else if(productStop.id == product.id)
                            return
                        console.log(products)
                        if(products.length>=favouritesUser.length)
                            return;
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
            <Navbar2/>
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