package com.globalbilgi.fatihayar.example.securtiy;

import com.auth0.jwt.JWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.globalbilgi.fatihayar.example.securtiy.constants.AuthConstant.SECRET_KEY;

@Component
public class JwtUtil implements Serializable {

    @Serial
    private static final long serialVersionUID = -2550185165626007488L;

    @Value("${jwt.accessToken.expirationMs}")
    private Long accessTokenExpirationMs;

    public String generateToken(UserDetails userDetails) {
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("User has no roles"));

        return doGenerateToken(role, userDetails.getUsername(), accessTokenExpirationMs);
    }

    private String doGenerateToken(String claim, String subject, Long expirationMs) {
        try {
            return JWT.create()
                    .withSubject(subject)
                    .withExpiresAt(new Date(System.currentTimeMillis() + expirationMs))
                    .withClaim("role", claim)
                    .sign(HMAC512(SECRET_KEY));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
