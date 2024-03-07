package com.globalbilgi.fatihayar.example.repository;

import com.globalbilgi.fatihayar.example.entity.Performance;
import com.globalbilgi.fatihayar.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Long> {

    Optional<List<Performance>> getPerformancesByUser(User user);

    @Query("SELECT t FROM Performance t WHERE t.dateInfo BETWEEN ?1 AND ?2")
    List<Performance> findPerformanceByBetweenDates(Date startDate, Date endDate);

    @Query("SELECT t FROM Performance t WHERE t.dateInfo BETWEEN ?1 AND ?2 AND t.user = ?3")
    List<Performance> findPerformanceByBetweenDatesAndUser(Date startDate, Date endDate, User user);
}
