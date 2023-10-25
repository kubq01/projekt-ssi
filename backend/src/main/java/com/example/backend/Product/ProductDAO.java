package org.example.Product;

public interface ProductDAO {
    ProductDTO getProductById(Long id);
    void createProduct(ProductDTO product);
    void updateProduct(ProductDTO product);
    void deleteProduct(Long id);
}
