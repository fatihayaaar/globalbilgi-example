package com.globalbilgi.fatihayar.example.service;

import com.globalbilgi.fatihayar.example.dto.ListPerformanceItemDto;
import com.globalbilgi.fatihayar.example.dto.PerformanceDto;
import com.globalbilgi.fatihayar.example.dto.UserDto;
import com.globalbilgi.fatihayar.example.entity.Performance;
import com.globalbilgi.fatihayar.example.entity.User;
import com.globalbilgi.fatihayar.example.repository.PerformanceRepository;
import com.globalbilgi.fatihayar.example.repository.UserRepository;
import com.globalbilgi.fatihayar.example.service.abstracts.IPerformanceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerformanceService extends BaseService<PerformanceDto> implements IPerformanceService<PerformanceDto> {

    private final PerformanceRepository repository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public void add(PerformanceDto performanceDto) {
        Performance performance = modelMapper.map(performanceDto, Performance.class);
        Optional<User> optionalUser = userRepository.getUserByMail(performanceDto.getUser().getMail());
        User user = optionalUser.orElseThrow(IllegalAccessError::new);
        performance.setUser(user);
        repository.saveAndFlush(performance);
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }

    @Override
    public void update(PerformanceDto performanceDto) {
        Performance performance = modelMapper.map(performanceDto, Performance.class);
        Optional<User> optionalUser = userRepository.getUserByMail(performanceDto.getUser().getMail());
        User user = optionalUser.orElseThrow(IllegalAccessError::new);
        performance.setUser(user);
        repository.saveAndFlush(performance);
    }

    @Override
    public List<ListPerformanceItemDto> getAllPerformances() {
        List<Performance> performances = repository.findAll();
        return performances.stream().map(this::convertToDtoListItem).collect(Collectors.toList());
    }

    @Override
    public List<PerformanceDto> getPerformancesByUser(UserDto userDto) {
        User user = userRepository.getUserByMail(userDto.getMail()).orElseThrow(IllegalAccessError::new);

        List<Performance> performances = user.getPerformances();
        return performances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<PerformanceDto> findPerformanceByBetweenDates(Date startDate, Date endDate) {
        List<Performance> performances = repository.findPerformanceByBetweenDates(startDate, endDate);
        return performances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<PerformanceDto> findPerformanceByBetweenDatesAndUser(Date startDate, Date endDate, User user) {
        List<Performance> performances = repository.findPerformanceByBetweenDatesAndUser(startDate, endDate, user);
        return performances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private PerformanceDto convertToDto(Performance performance) {
        return modelMapper.map(performance, PerformanceDto.class);
    }

    private ListPerformanceItemDto convertToDtoListItem(Performance performance) {
        return modelMapper.map(performance, ListPerformanceItemDto.class);
    }
}
