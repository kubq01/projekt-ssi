package com.example.backend.auth;

import com.example.backend.User.UserDAO;
import com.example.backend.User.UserDAOimpl;
import com.example.backend.User.UserDTO;

import java.util.Date;
import java.util.HashMap;

public class AuthService {
    private final UserDAOimpl repository = new UserDAOimpl();
    private final TokenGenerator jwtService = TokenGenerator.getInstance();

    public AuthenticationResponse register(RegisterRequest request) throws UsernameTakenException{
        if(repository.getUserByEmail(request.getEmail()) != null)
            throw new UsernameTakenException("Email is already being used by another account");
        UserDTO user = UserDTO.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .login(request.getEmail())
                .dateOfBirth(request.getDateOfBirth())
                .password(request.getPassword())
                .email(request.getEmail())
                .role(request.getRole())
                .isBlocked(false)
                .build();

        //debug
        System.out.println(user.toString());

        repository.createUser(user);
        String jwtToken = jwtService.generateToken(user.getEmail());
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .role(request.getRole())
                .isBlocked(false)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UserDTO user = repository.getUserByEmail(request.getEmail());
        if(user == null || !user.getPassword().equals(request.getPassword()))
            return AuthenticationResponse.builder()
                    .accessToken("FORBIDDEN")
                    .role("FORBIDDEN")
                    .isBlocked(true)
                    .build();
        else
            return AuthenticationResponse.builder()
                    .accessToken(jwtService.generateToken(user.getEmail()))
                    .role(user.getRole())
                    .isBlocked(user.isBlocked())
                    .build();
    }

    public UserDTO getUserFromToken(String token){
        return repository.getUserByEmail(jwtService.getEmailFromToken(token));
    }
}
