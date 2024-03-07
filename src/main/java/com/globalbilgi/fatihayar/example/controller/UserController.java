package com.globalbilgi.fatihayar.example.controller;

import com.globalbilgi.fatihayar.example.dto.SearchUserDto;
import com.globalbilgi.fatihayar.example.dto.UserDto;
import com.globalbilgi.fatihayar.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;

    @PostMapping("/add")
    public ResponseEntity<Boolean> add(@RequestBody UserDto userDto) {
        service.add(userDto);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> add(@PathVariable long id) {
        service.delete(id);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]')")
    @PostMapping("/update")
    public ResponseEntity<Boolean> update(@RequestBody UserDto userDto) {
        service.update(userDto);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_[USER]')")
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> get() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]')")
    @PostMapping("/search")
    public ResponseEntity<List<UserDto>> search(@RequestBody SearchUserDto searchUserDto) {
        return ResponseEntity.ok(service.search(searchUserDto.getFirstname(), searchUserDto.getSurname(), searchUserDto.getFirstname2(), searchUserDto.getSurname2()));
    }
}
