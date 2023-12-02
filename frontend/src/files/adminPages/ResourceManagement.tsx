import  { useState, useEffect } from 'react';
import {Product} from "../Product.tsx";
import {useNavigate} from "react-router-dom";
import Navbar2 from "../../components/Navbar2.tsx";

const ResourceManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({id: 0,
        categoryId: 0,
        name: "",
        price: 0,
        rating: 0});
    const [editedProduct, setEditedProduct] = useState<Product>({id: 0,
        categoryId: 0,
        name: "",
        price: 0,
        rating: 0});
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:8083/product/allall';
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
            const response = await fetch("http://localhost:8083/product", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${token}`,
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Product added successfully`);

            navigate(0)
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
                    'Authorization':  `Bearer ${token}`,
                },
                body: JSON.stringify(editedProduct),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Product edited successfully`);

            navigate(0)
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
                    'Authorization':  `Bearer ${token}`,
                },
                body: JSON.stringify(deleteProd),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Product deleted successfully`);

            navigate(0)
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <Navbar2/>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price} - Rating: {product.rating}
                        <button onClick={() => setEditedProduct(product)}>Edit Product</button>
                        <button onClick={() => deleteProduct(product)}>Delete Product</button>
                    </li>
                ))}
            </ul>
            <h2>Add/Edit Product</h2>
            <div>
                <label>Category ID:</label>
                <input
                    type="number"
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />
            </div>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    value={newProduct.rating}
                    onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}
                />
            </div>
            <button onClick={addProduct}>Add Product</button>

            {/* Edit Product Section */}
            <h2>Edit Product</h2>
            <div>
                <label>ID:</label>
                <input
                    type="number"
                    value={editedProduct.id}
                    onChange={(e) => setEditedProduct({ ...editedProduct, id: e.target.value })}
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                />
            </div>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    value={editedProduct.rating}
                    onChange={(e) => setEditedProduct({ ...editedProduct, rating: parseFloat(e.target.value) })}
                />
            </div>
            <button onClick={editProduct}>Edit Product</button>
        </div>
    );
};

export default ResourceManagement;