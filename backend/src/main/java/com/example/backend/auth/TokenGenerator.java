package com.example.backend.auth;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

public class TokenGenerator {

    private static TokenGenerator instance;
    private final String secret = "SECRET_KEY";  //cybersecurity intensifies

    private final Algorithm algorithm = Algorithm.HMAC256(secret);


    private TokenGenerator() {}

    public static synchronized TokenGenerator getInstance() {
        if (instance == null) {
            instance = new TokenGenerator();
        }
        return instance;
    }

    public String generateToken(String email) {
        try {
            return JWT.create()
                    .withSubject(email)
                    .sign(algorithm);
        } catch (Exception e) {
            throw new RuntimeException("Error during token generation", e);
        }
    }

    public String getEmailFromToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(this.algorithm).withIssuer("projekt-ssi").build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getSubject();
        } catch (Exception e) {
            throw new RuntimeException("Error during token decoding", e);
        }
    }
}

