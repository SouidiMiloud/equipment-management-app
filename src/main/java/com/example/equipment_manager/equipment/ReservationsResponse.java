package com.example.equipment_manager.equipment;

import com.example.equipment_manager.user.UserRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;


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

}