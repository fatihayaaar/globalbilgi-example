package com.globalbilgi.fatihayar.example.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class UserMiniDto extends BaseDto {

    private long id;
    private String firstname;
    private String surname;
    private String agent;
}
