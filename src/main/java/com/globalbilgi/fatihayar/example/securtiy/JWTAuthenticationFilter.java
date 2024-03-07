package com.globalbilgi.fatihayar.example.securtiy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalbilgi.fatihayar.example.dto.AuthDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.globalbilgi.fatihayar.example.securtiy.constants.AuthConstant.HEADER_STRING;
import static com.globalbilgi.fatihayar.example.securtiy.constants.AuthConstant.TOKEN_PREFIX;

@RequiredArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
        try {
            AuthDto user = new ObjectMapper().readValue(req.getInputStream(), AuthDto.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getMail(),
                            user.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) throws IOException, ServletException {
        UserDetails userDetails = userService.loadUserByUsername(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername());
        String token = jwtUtil.generateToken(userDetails);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("token", TOKEN_PREFIX + token);

        PrintWriter writer = res.getWriter();
        writer.write(jsonResponse.toString());
        writer.flush();
    }
}
