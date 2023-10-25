package org.example.User;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
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
