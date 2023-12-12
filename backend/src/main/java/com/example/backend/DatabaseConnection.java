package com.example.backend;
import java.sql.*;
import java.util.function.Function;

import static java.sql.DriverManager.getConnection;

public class DatabaseConnection {
    private static DatabaseConnection instance = null;
    private Connection connection = null;

    private DatabaseConnection() {
        try {
            Class.forName("org.postgresql.Driver");
        } catch(ClassNotFoundException e) {
            e.printStackTrace();
        }

        String url = "jdbc:postgresql://localhost:5432/projekt_ssi";
        String username = "postgres";
        String password = "password";

        try {
            connection = getConnection(url, username, password);
        } catch (SQLException e) {
            e.printStackTrace(); // Obsługa błędów
        }
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public ResultSet sendQuery(PreparedStatement statement) {
        try {
            return statement.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    public PreparedStatement prepareStatement(String query){
        try {
            return connection.prepareStatement(query);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendUpdate(PreparedStatement statement) {
        try {
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}