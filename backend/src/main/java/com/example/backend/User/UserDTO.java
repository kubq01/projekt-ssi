package com.example.backend.User;

import lombok.Builder;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
public class UserDTO {

    @Generated
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String login;
    private String password;
    private String email;
    private String role;

    // Getters and setters
}
