package com.globalbilgi.fatihayar.example.dto;

import com.globalbilgi.fatihayar.example.entity.User;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class FilterPerformanceDto extends BaseDto {

    private Date startDate;
    private Date endDate;
    private User user;
}
