package org.example.User;

import org.example.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDAOimpl implements UserDAO {

    @Override
    public UserDTO getUserById(Long id) {
        String query = "SELECT * FROM user WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(query);

        try {
            preparedStatement.setLong(1, id);
            return DatabaseConnection.getInstance().sendQuery(preparedStatement).getObject(1, UserDTO.class);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void createUser(UserDTO user) {
        String statement = "INSERT INTO user (firstName, lastName, dateOfBirth, login, password, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setString(1, user.getFirstName());
            preparedStatement.setString(2, user.getLastName());
            preparedStatement.setDate(3, new java.sql.Date(user.getDateOfBirth().getTime()));
            preparedStatement.setString(4, user.getLogin());
            preparedStatement.setString(5, user.getPassword());
            preparedStatement.setString(6, user.getEmail());
            preparedStatement.setString(7, user.getRole());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateUser(UserDTO user) {
        String statement = "UPDATE user SET firstName = ?, lastName = ?, dateOfBirth = ?, login = ?, password = ?, email = ?, role = ? WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setString(1, user.getFirstName());
            preparedStatement.setString(2, user.getLastName());
            preparedStatement.setDate(3, new java.sql.Date(user.getDateOfBirth().getTime()));
            preparedStatement.setString(4, user.getLogin());
            preparedStatement.setString(5, user.getPassword());
            preparedStatement.setString(6, user.getEmail());
            preparedStatement.setString(7, user.getRole());
            preparedStatement.setLong(8, user.getId());
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteUser(Long id) {
        String statement = "DELETE FROM user WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, id);
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}