package com.globalbilgi.fatihayar.example.entity;

import com.globalbilgi.fatihayar.example.entity.enums.Excuse;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "performance")
public class Performance extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Timestamp beginTime;
    private Timestamp endTime;
    private Date dateInfo;
    private int breakTime;
    private int excuseHours;
    private Excuse excuse;
    private int timeout;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
