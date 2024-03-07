package com.globalbilgi.fatihayar.example.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class SearchUserDto extends BaseDto {

    private String firstname;
    private String surname;
    private String firstname2;
    private String surname2;
}
