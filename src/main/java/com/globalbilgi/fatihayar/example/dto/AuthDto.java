package com.globalbilgi.fatihayar.example.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class AuthDto extends BaseDto {

    private String mail;
    private String password;
}
