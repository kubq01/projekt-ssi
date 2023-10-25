package org.example.Product;

import org.example.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ProductDAOimpl implements ProductDAO {

    @Override
    public ProductDTO getProductById(Long id) {
        String query = "SELECT * FROM product WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(query);

        try {
            preparedStatement.setLong(1, id);
            return DatabaseConnection.getInstance().sendQuery(preparedStatement).getObject(1, ProductDTO.class);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void createProduct(ProductDTO product) {
        String statement = "INSERT INTO product (categoryId, name, price, rating) VALUES (?, ?, ?, ?)";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, product.getCategoryId());
            preparedStatement.setString(2, product.getName());
            preparedStatement.setDouble(3, product.getPrice());
            preparedStatement.setDouble(4, product.getRating());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateProduct(ProductDTO product) {
        String statement = "UPDATE product SET categoryId = ?, name = ?, price = ?, rating = ? WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, product.getCategoryId());
            preparedStatement.setString(2, product.getName());
            preparedStatement.setDouble(3, product.getPrice());
            preparedStatement.setDouble(4, product.getRating());
            preparedStatement.setLong(5, product.getId());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteProduct(Long id) {
        String statement = "DELETE FROM product WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, id);
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
