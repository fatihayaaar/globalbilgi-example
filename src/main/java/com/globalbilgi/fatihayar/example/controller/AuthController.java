package com.globalbilgi.fatihayar.example.controller;

import com.globalbilgi.fatihayar.example.dto.RegisterUserDto;
import com.globalbilgi.fatihayar.example.dto.UserDto;
import com.globalbilgi.fatihayar.example.securtiy.JwtUtil;
import com.globalbilgi.fatihayar.example.securtiy.UserDetailsServiceImpl;
import com.globalbilgi.fatihayar.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ModelMapper modelMapper;

    @PostMapping("/sign-up")
    public ResponseEntity<Boolean> signUp(@RequestBody RegisterUserDto userDto) {
        userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        userService.add(modelMapper.map(userDto, UserDto.class));
        return ResponseEntity.ok(true);
    }
}
