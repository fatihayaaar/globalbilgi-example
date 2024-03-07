package com.globalbilgi.fatihayar.example.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class RegisterUserDto extends BaseDto {

    private String firstname;
    private String surname;
    private String mail;
    private String password;
    private String agent;
    private String photo;
}
