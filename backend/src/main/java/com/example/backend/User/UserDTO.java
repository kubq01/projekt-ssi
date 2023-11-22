package com.example.backend.User;

import com.example.backend.Favourite.FavouriteDTO;
import lombok.Builder;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

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

    private List<FavouriteDTO> favourites;
    // Getters and setters
}
