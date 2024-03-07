package com.globalbilgi.fatihayar.example.entity;

import com.globalbilgi.fatihayar.example.entity.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "user_info")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String firstname;
    private String surname;
    private String agent;
    private String mail;
    private String password;
    private String photo;
    private List<UserRole> roles;

    @OneToMany(mappedBy = "user")
    private List<Performance> performances;
}
