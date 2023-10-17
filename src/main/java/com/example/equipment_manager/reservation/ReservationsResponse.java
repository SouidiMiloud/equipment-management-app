package com.example.equipment_manager.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationsResponse {

    private Long id;
    private Integer productId;
    private Integer userId;
    private String productName;
    private String userName;
    private String time;
    private String startsAt;
    private String endsAt;
    private String reservationState;
    private String message;

}