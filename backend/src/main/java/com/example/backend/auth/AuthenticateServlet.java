package com.example.backend.auth;


import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;

@WebServlet("/auth/authenticate")
public class AuthenticateServlet extends HttpServlet {

    private final AuthService service;

    public AuthenticateServlet() {
        this.service = new AuthService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestBody = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
        AuthenticationRequest authenticationRequest = new ObjectMapper().readValue(requestBody, AuthenticationRequest.class);

        AuthenticationResponse authenticationResponse = service.authenticate(authenticationRequest);
        response.setContentType("application/json");
        response.getWriter().write(new ObjectMapper().writeValueAsString(authenticationResponse));
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
