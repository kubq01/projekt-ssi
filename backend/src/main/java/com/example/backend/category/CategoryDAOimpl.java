package org.example.category;

import org.example.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CategoryDAOimpl implements CategoryDAO{

    @Override
    public CategoryDTO getCategoryById(Long id) {
        String query ="SELECT * FROM CATEGORY WHERE id = (?)";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(query);
        try {
            preparedStatement.setLong(1, id);
            return DatabaseConnection.getInstance().sendQuery(preparedStatement).getObject(1,CategoryDTO.class);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void createCategory(CategoryDTO category) {
        String statement = "INSERT INTO category (id, name) VALUES (?, ?)";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);
        try {
            preparedStatement.setLong(1, category.getId());
            preparedStatement.setString(2, category.getName());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }

    @Override
    public void updateCategory(CategoryDTO category) {
        String statement = "UPDATE category SET  name = ? WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);
        try {
            preparedStatement.setString(1, category.getName());
            preparedStatement.setLong(2, category.getId());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }
    @Override
    public void deleteCategory(Long id) {
        String statement = "DELETE FROM category WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, id);
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
