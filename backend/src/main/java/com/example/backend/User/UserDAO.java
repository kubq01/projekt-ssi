package com.example.backend.User;

import java.util.List;

public interface UserDAO {
    UserDTO getUserById(Long id);
    void createUser(UserDTO User);
    void updateUser(UserDTO User);
    void deleteUser(Long id);
    UserDTO getUserByEmail(String email);
    List<UserDTO> getAllNotAdmins();
}
