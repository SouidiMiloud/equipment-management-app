package com.example.equipment_manager.equipment;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Integer equipmentId;
    private Integer userId;
    private LocalDateTime time;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    @Enumerated(EnumType.STRING)
    private ReservationState reservationState;

    public Reservation(){

        reservationState = ReservationState.UNCHECKED;
        time = LocalDateTime.now();
    }

    public Reservation(Integer equipmentId, Integer userId, LocalDateTime startsAt, LocalDateTime endsAt) {

        this.equipmentId = equipmentId;
        this.userId = userId;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        reservationState = ReservationState.UNCHECKED;
        time = LocalDateTime.now();
    }
}