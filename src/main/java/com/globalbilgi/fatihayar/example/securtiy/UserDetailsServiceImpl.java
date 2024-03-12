package com.globalbilgi.fatihayar.example.securtiy;

import com.globalbilgi.fatihayar.example.entity.User;
import com.globalbilgi.fatihayar.example.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User applicationUser = repository.getUserByMail(username).orElseThrow(IllegalAccessError::new);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return org.springframework.security.core.userdetails.User.builder().username(applicationUser.getMail()).password(applicationUser.getPassword()).roles(applicationUser.getRole().toString()).build();
    }
}
