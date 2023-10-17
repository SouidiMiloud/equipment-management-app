package com.example.equipment_manager.user;

import com.example.equipment_manager.product.*;
import com.example.equipment_manager.reservation.Reservation;
import com.example.equipment_manager.reservation.ReservationState;
import com.example.equipment_manager.reservation.ReservationsResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
@AllArgsConstructor
public class UserService {

    private UserRepo userRepo;

    public ResponseEntity<List<LaboUser>> getStudents() {

        return ResponseEntity.ok().body(userRepo.getStudents(LaboUserRole.STUDENT));
    }

    public ResponseEntity<Map<String, String>> getNameAndRole(LaboUser user) {

        Map<String, String> mp = new HashMap<>();
        mp.put("username", user.getEmail());
        mp.put("role", user.getUserRole().toString());
        return ResponseEntity.ok().body(mp);
    }
}