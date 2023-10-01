package com.example.equipment_manager.equipment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationsResponse {

    private Long id;
    private Integer equipmentId;
    private Integer userId;
    private String equipmentName;
    private String userName;
    private String time;
    private String startsAt;
    private String endsAt;
    private String reservationState;
    private String message;

}