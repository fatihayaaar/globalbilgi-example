package com.globalbilgi.fatihayar.example.dto;

import com.globalbilgi.fatihayar.example.entity.enums.UserRole;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class UserDto extends BaseDto {

    private long id;
    private String firstname;
    private String surname;
    private String mail;
    private String password;
    private String agent;
    private String photo;
    private UserRole role;
}
