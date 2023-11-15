package com.example.backend.User;

import com.example.backend.auth.AuthService;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@WebServlet(name = "user", value = "/user")
public class UserServlet extends HttpServlet {

    private UserDAOimpl userDAO = new UserDAOimpl();
    private Gson gson = new Gson();
    private AuthService service = new AuthService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");

        String action = request.getParameter("action");

        if ("getUserById".equals(action)) {
            Long userId = Long.parseLong(request.getParameter("id"));
            UserDTO user = userDAO.getUserById(userId);
            response.getWriter().write(userToJson(user));
        } else if ("getUserByEmail".equals(action)) {
            String userEmail = request.getParameter("email");
            UserDTO user = userDAO.getUserByEmail(userEmail);
            response.getWriter().write(userToJson(user));
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");

        String action = request.getParameter("action");

        if ("createUser".equals(action)) {
            // Assuming you have the necessary parameters in the request
            UserDTO newUser = extractUserFromRequest(request);
            userDAO.createUser(newUser);
            response.getWriter().write("User created successfully!");
        } else if ("updateUser".equals(action)) {
            // Assuming you have the necessary parameters in the request
            UserDTO updatedUser = extractUserFromRequest(request);
            userDAO.updateUser(updatedUser);
            response.getWriter().write("User updated successfully!");
        } else if ("deleteUser".equals(action)) {
            Long userId = Long.parseLong(request.getParameter("id"));
            userDAO.deleteUser(userId);
            response.getWriter().write("User deleted successfully!");
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    private UserDTO extractUserFromRequest(HttpServletRequest request) {
        // Extract user data from the request parameters
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String dateOfBirthString = request.getParameter("dateOfBirth");
        // Assuming dateOfBirth is provided as a String in the format "yyyy-MM-dd"
        LocalDate dateOfBirth = LocalDate.parse(dateOfBirthString, DateTimeFormatter.ISO_LOCAL_DATE);
        String login = request.getParameter("login");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String role = request.getParameter("role");

        // Construct a new UserDTO object
        UserDTO user = UserDTO.builder()
                .firstName(firstName)
                .lastName(lastName)
                .dateOfBirth(dateOfBirth)
                .login(login)
                .password(password)
                .email(email)
                .role(role)
                .build();

        return user;
    }

    private String userToJson(UserDTO user) {
        return gson.toJson(user);
    }
}