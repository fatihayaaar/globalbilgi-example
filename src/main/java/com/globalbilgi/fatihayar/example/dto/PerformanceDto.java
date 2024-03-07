package com.globalbilgi.fatihayar.example.dto;

import com.globalbilgi.fatihayar.example.entity.enums.Excuse;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class PerformanceDto extends BaseDto {

    private long id;
    private UserDto user;
    private Timestamp beginTime;
    private Timestamp endTime;
    private int breakTime;
    private Date dateInfo;
    private int excuseHours;
    private Excuse excuse;
}
