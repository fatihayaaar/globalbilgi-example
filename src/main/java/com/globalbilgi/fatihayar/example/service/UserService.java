package com.globalbilgi.fatihayar.example.service;

import com.globalbilgi.fatihayar.example.dto.UserDto;
import com.globalbilgi.fatihayar.example.entity.User;
import com.globalbilgi.fatihayar.example.entity.enums.UserRole;
import com.globalbilgi.fatihayar.example.repository.UserRepository;
import com.globalbilgi.fatihayar.example.service.abstracts.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService<UserDto> {

    private final UserRepository repository;
    private final ModelMapper modelMapper;

    @Override
    public void add(UserDto user) {
        List<UserRole> roles = new ArrayList<>();
        roles.add(UserRole.USER);
        user.setRoles(roles);

        repository.saveAndFlush(modelMapper.map(user, User.class));
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }

    @Override
    public void update(UserDto user) {
        repository.saveAndFlush(modelMapper.map(user, User.class));
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = repository.findAll();
        return users.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<UserDto> search(String firstname, String surname, String firstname2, String surname2) {
        List<User> users = repository.findByFirstnameContainingIgnoreCaseOrSurnameContainingIgnoreCaseOrFirstnameContainingIgnoreCaseAndSurnameContainingIgnoreCase(firstname, surname, firstname2, surname2);
        return users.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public UserDto getUserByMail(String mail) {
        return modelMapper.map(repository.getUserByMail(mail).orElseThrow(IllegalAccessError::new), UserDto.class);
    }

    private UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
