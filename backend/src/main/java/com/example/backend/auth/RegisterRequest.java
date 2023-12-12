package com.example.backend.auth;

import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstname;
  private String lastname;
  @Getter
  private LocalDate dateOfBirth;
  private String email;
  private String password;
  private String role;
}
