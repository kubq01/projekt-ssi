package org.example.Favourite;

import org.example.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class FavouriteDAOimpl implements FavouriteDAO {
    @Override
    public FavouriteDTO getFavouriteById(Long id) {
        String query = "SELECT * FROM favourite WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(query);

        try {
            preparedStatement.setLong(1, id);
            return DatabaseConnection.getInstance().sendQuery(preparedStatement).getObject(1, FavouriteDTO.class);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void createFavourite(FavouriteDTO favourite) {
        String statement = "INSERT INTO favourite (userId, productId) VALUES (?, ?)";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, favourite.getUserId());
            preparedStatement.setLong(2, favourite.getProductId());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateFavourite(FavouriteDTO favourite) {
        String statement = "UPDATE favourite SET userId = ?, productId = ? WHERE userId = ?, productId = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, favourite.getUserId());
            preparedStatement.setLong(2, favourite.getProductId());
            preparedStatement.setLong(3, favourite.getUserId());
            preparedStatement.setLong(4, favourite.getProductId());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteFavourite(Long id) {
        String statement = "DELETE FROM favourite WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, id);
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}

