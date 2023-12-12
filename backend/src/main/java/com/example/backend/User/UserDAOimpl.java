package com.example.backend.User;

import com.example.backend.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;

public class UserDAOimpl implements UserDAO {

    @Override
    public UserDTO getUserById(Long id) {
        String query = "SELECT * FROM public.user WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(query);

        try {
            preparedStatement.setLong(1, id);
            return DatabaseConnection.getInstance().sendQuery(preparedStatement).getObject(1, UserDTO.class);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        String query = "SELECT * FROM public.user WHERE email = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(query);

        try {
            preparedStatement.setString(1, email);
            ResultSet resultSet = DatabaseConnection.getInstance().sendQuery(preparedStatement);

            if (resultSet.next() && resultSet.getDate("dateOfBirth") != null) {
                UserDTO userData = UserDTO.builder()
                        .id(resultSet.getLong("id"))
                        .firstName(resultSet.getString("firstName"))
                        .lastName(resultSet.getString("lastName"))
                        .dateOfBirth(resultSet.getDate("dateOfBirth").toLocalDate())
                        .login(resultSet.getString("login"))
                        .password(resultSet.getString("password"))
                        .email(resultSet.getString("email"))
                        .role(resultSet.getString("role"))
                        .isBlocked(resultSet.getBoolean("is_blocked"))
                        .build();

                userData.setFavourites(emptyList());

                return userData;
            } else {
                // Handle the case where no user with the specified email was found
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<UserDTO> getAllNotAdmins() {
        String query = "SELECT * FROM public.user WHERE role = 'USER'";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(query);

        try (ResultSet resultSet = DatabaseConnection.getInstance().sendQuery(preparedStatement)) {
            List<UserDTO> userList = new ArrayList<>();

            while (resultSet.next()) {
                // Assuming UserDTO has a constructor that takes the necessary fields
                UserDTO userDTO = new UserDTO(
                        resultSet.getLong("id"),
                        resultSet.getString("firstName"),
                        resultSet.getString("lastName"),
                        resultSet.getDate("dateOfBirth").toLocalDate(),
                        resultSet.getString("login"),
                        resultSet.getString("password"),
                        resultSet.getString("email"),
                        resultSet.getString("role"),
                        resultSet.getBoolean("isBlocked"),
                        emptyList()
                );
                userList.add(userDTO);
            }

            return userList;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public void createUser(UserDTO user) {
        String statement = "INSERT INTO public.user (firstName, lastName, dateOfBirth, login, password, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setString(1, user.getFirstName());
            preparedStatement.setString(2, user.getLastName());
            preparedStatement.setDate(3, Date.valueOf(user.getDateOfBirth()));
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
        String statement = "UPDATE public.user SET firstName = ?, lastName = ?, dateOfBirth = ?, login = ?, password = ?, email = ?, role = ? WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setString(1, user.getFirstName());
            preparedStatement.setString(2, user.getLastName());
            preparedStatement.setDate(3, Date.valueOf(user.getDateOfBirth()));
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
        String statement = "DELETE FROM public.user WHERE id = ?";
        PreparedStatement preparedStatement = DatabaseConnection.getInstance().prepareStatement(statement);

        try {
            preparedStatement.setLong(1, id);
            DatabaseConnection.getInstance().sendUpdate(preparedStatement);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}