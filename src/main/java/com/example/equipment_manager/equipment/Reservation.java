package com.example.equipment_manager.equipment;

import lombok.Data;
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
    private String message;

    public Reservation(){

        reservationState = ReservationState.UNCHECKED;
        time = LocalDateTime.now();
    }

    public Reservation(Integer equipmentId, Integer userId, LocalDateTime time, LocalDateTime startsAt, LocalDateTime endsAt, ReservationState reservationState, String message) {
        this.equipmentId = equipmentId;
        this.userId = userId;
        this.time = time;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.reservationState = reservationState;
        this.message = message;
    }
}