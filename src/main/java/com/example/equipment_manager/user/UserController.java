package com.example.equipment_manager.user;

import com.example.equipment_manager.equipment.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> newUser(@RequestBody UserRequest request){

        return userService.saveUser(request);
    }

    @GetMapping("/getRole")
    public ResponseEntity<String> getRole(@AuthenticationPrincipal LaboUser user){

        return ResponseEntity.ok().body(user.getUserRole().toString());
    }

    @PostMapping("/newEquipment")
    public ResponseEntity<String> newEquipment(@RequestBody Equipment equipment){

        return userService.saveEquipment(equipment);
    }

    @GetMapping("/getMaterials")
    public ResponseEntity<List<Equipment>> getMaterials(){

        return userService.getMaterials();
    }

    @GetMapping("/details")
    public ResponseEntity<EquipmentResponse> details(@RequestParam Integer id){

        return userService.availableAt(id);
    }

    @PostMapping("/reservation")
    public ResponseEntity<String> reserve(@AuthenticationPrincipal LaboUser user, @RequestBody Reservation reservation){

        return userService.saveReservation(user, reservation);
    }

    @PostMapping("/confirmReservation")
    public void confirm(@RequestBody Map<String, Long> request){

        userService.confirmReservation(request.get("reservationId"));
    }

    @PostMapping("/rejectReservation")
    public void reject(@RequestBody Map<String, Object> request){

        userService.rejectReservation(request);
    }

    @PostMapping("/deleteReservation")
    public void delete(@RequestBody Map<String, Long> request){

        userService.deleteReservation(request.get("reservationId"));
    }

    @GetMapping("/getReservationsNum")
    public ResponseEntity<String> getReservationsNum(@AuthenticationPrincipal LaboUser laboUser){

        return userService.getReservationsNum(laboUser);
    }

    @GetMapping("/getReservations")
    public ResponseEntity<List<ReservationsResponse>> getReservations(){

        return userService.getReservations();
    }

    @GetMapping("/getUserReservations")
    public ResponseEntity<List<ReservationsResponse>> getReservations(@AuthenticationPrincipal LaboUser laboUser){

        return userService.getUserReservations(laboUser.getId());
    }

    @GetMapping("/getNotification")
    public ResponseEntity<UserNotification> getNotif(@AuthenticationPrincipal LaboUser laboUser){

        return userService.getNotif(laboUser.getId());
    }

    @PostMapping("/removeNotif")
    public void removeNotif(@RequestBody Map<String, Integer> request){

        userService.removeNotif(request.get("notifId"));
    }

    @GetMapping("/getStudents")
    public ResponseEntity<List<LaboUser>> getStudents(){

        return userService.getStudents();
    }
}