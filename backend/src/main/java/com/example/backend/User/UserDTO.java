package com.example.backend.User;

import lombok.Builder;
import lombok.Data;
import lombok.Generated;

import java.util.Date;

@Data
@Builder
public class UserDTO {

    @Generated
    private Long id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String login;
    private String password;
    private String email;
    private String role;

    // Getters and setters
}
