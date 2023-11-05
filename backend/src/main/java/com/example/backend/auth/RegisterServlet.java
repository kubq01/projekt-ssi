package com.example.backend.auth;


import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;

@WebServlet("/auth/register")
public class RegisterServlet extends HttpServlet {

    private final AuthService service;

    public RegisterServlet() {
        this.service = new AuthService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestBody = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
        RegisterRequest registerRequest = new ObjectMapper().readValue(requestBody, RegisterRequest.class);

        try {
            AuthenticationResponse authenticationResponse = service.register(registerRequest);
            response.setContentType("application/json");
            response.getWriter().write(new ObjectMapper().writeValueAsString(authenticationResponse));
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (UsernameTakenException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
}

