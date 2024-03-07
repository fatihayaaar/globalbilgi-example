package com.globalbilgi.fatihayar.example.service.abstracts;

import com.globalbilgi.fatihayar.example.dto.BaseDto;
import com.globalbilgi.fatihayar.example.dto.ListPerformanceItemDto;
import com.globalbilgi.fatihayar.example.dto.UserDto;
import com.globalbilgi.fatihayar.example.entity.Performance;
import com.globalbilgi.fatihayar.example.entity.User;

import java.util.Date;
import java.util.List;

public interface IPerformanceService<T extends BaseDto> extends IBaseService<T> {

    List<ListPerformanceItemDto> getAllPerformances();

    List<T> getPerformancesByUser(UserDto userDto);

    List<T> findPerformanceByBetweenDates(Date startDate, Date endDate);

    List<T> findPerformanceByBetweenDatesAndUser(Date startDate, Date endDate, User user);
}
