package com.example.backend.auth;

public class UsernameTakenException extends Exception{
    public UsernameTakenException(String string){
        super(string);
    }
}
