package com.globalbilgi.fatihayar.example.controller;

import com.globalbilgi.fatihayar.example.dto.FilterPerformanceDto;
import com.globalbilgi.fatihayar.example.dto.ListPerformanceItemDto;
import com.globalbilgi.fatihayar.example.dto.PerformanceDto;
import com.globalbilgi.fatihayar.example.dto.UserDto;
import com.globalbilgi.fatihayar.example.entity.User;
import com.globalbilgi.fatihayar.example.service.PerformanceService;
import com.globalbilgi.fatihayar.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    private final PerformanceService service;
    private final UserService userService;

    @PreAuthorize("hasRole('ROLE_[USER]') or hasRole('ROLE_[ADMIN]')")
    @PostMapping("/add")
    public ResponseEntity<Boolean> add(Authentication authentication, @RequestBody PerformanceDto performanceDto) {
        UserDto user = userService.getUserByMail(authentication.getName());
        performanceDto.setUser(user);
        service.add(performanceDto);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]') or hasRole('ROLE_[USER]')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_[USER]') or hasRole('ROLE_[ADMIN]')")
    @PutMapping("/update")
    public ResponseEntity<Boolean> update(Authentication authentication, @RequestBody PerformanceDto performanceDto) {
        UserDto user = userService.getUserByMail(authentication.getName());
        performanceDto.setUser(user);
        if (performanceDto.getId() <= 0) {
            return ResponseEntity.ok(false);
        }
        service.update(performanceDto);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]')")
    @GetMapping("/all")
    public ResponseEntity<List<ListPerformanceItemDto>> getAll() {
        return ResponseEntity.ok(service.getAllPerformances());
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]')")
    @GetMapping("/get/{mail}")
    public ResponseEntity<List<PerformanceDto>> getPerformancesByUser(@PathVariable String mail) {
        return ResponseEntity.ok(service.getPerformancesByUser(UserDto.builder().mail(mail).build()));
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]')")
    @PostMapping("/get/filter")
    public ResponseEntity<List<PerformanceDto>> findPerformanceByBetweenDatesAndUser(@RequestBody FilterPerformanceDto filterPerformanceDto) {
        if (filterPerformanceDto.getUser() == null) {
            return ResponseEntity.ok(service.findPerformanceByBetweenDates(filterPerformanceDto.getStartDate(), filterPerformanceDto.getEndDate()));
        } return ResponseEntity.ok(service.findPerformanceByBetweenDatesAndUser(filterPerformanceDto.getStartDate(), filterPerformanceDto.getEndDate(), filterPerformanceDto.getUser()));
    }

    @PreAuthorize("hasRole('ROLE_[ADMIN]') or hasRole('ROLE_[USER]')")
    @PostMapping("/get/my-filter")
    public ResponseEntity<List<PerformanceDto>> findPerformanceByBetweenDates(@RequestBody FilterPerformanceDto filterPerformanceDto) {
        return ResponseEntity.ok(service.findPerformanceByBetweenDates(filterPerformanceDto.getStartDate(), filterPerformanceDto.getEndDate()));
    }

    @PreAuthorize("hasRole('ROLE_[USER]') or hasRole('ROLE_[ADMIN]')")
    @GetMapping("/get/my")
    public ResponseEntity<List<PerformanceDto>> getMyPerformances(Authentication authentication) {
        UserDto user = userService.getUserByMail(authentication.getName());
        return ResponseEntity.ok(service.getPerformancesByUser(user));
    }
}
