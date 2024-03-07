package com.globalbilgi.fatihayar.example.repository;

import com.globalbilgi.fatihayar.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByFirstnameContainingIgnoreCaseOrSurnameContainingIgnoreCaseOrFirstnameContainingIgnoreCaseAndSurnameContainingIgnoreCase(String firstname, String surname, String firstname2, String surname2);

    Optional<User> getUserByMail(String mail);
}
