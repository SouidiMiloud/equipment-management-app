package com.example.equipment_manager.reservation;

import com.example.equipment_manager.product.Item;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Integer productId;
    private Integer userId;
    private LocalDateTime time;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    private Integer items;
    @ElementCollection
    private List<Long> itemsIds;
    @Enumerated(EnumType.STRING)
    private ReservationState reservationState;
    private String message;

    public Reservation(){

        reservationState = ReservationState.UNCHECKED;
        time = LocalDateTime.now();
    }

    public Reservation(Integer productId, Integer userId, LocalDateTime time, LocalDateTime startsAt, LocalDateTime endsAt, Integer items, ReservationState reservationState, String message) {
        this.productId = productId;
        this.userId = userId;
        this.time = time;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.items = items;
        this.reservationState = reservationState;
        this.message = message;
    }
}