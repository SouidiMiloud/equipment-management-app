package com.example.equipment_manager.reservation;

import com.example.equipment_manager.user.LaboUser;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@AllArgsConstructor
@RequestMapping("/reservation")
public class ReservationController {

    private ReservationService reservationService;


    @PostMapping("/reservation")
    public ResponseEntity<String> reserve(@AuthenticationPrincipal LaboUser user, @RequestBody Reservation reservation){

        return reservationService.saveReservation(user, reservation);
    }

    @PostMapping("/confirmReservation")
    public void confirm(@AuthenticationPrincipal LaboUser user, @RequestBody Map<String, Long> request){

        reservationService.confirmReservation(user, request.get("reservationId"));
    }

    @PostMapping("/rejectReservation")
    public void reject(@AuthenticationPrincipal LaboUser user, @RequestBody Map<String, Object> request){

        reservationService.rejectReservation(user, request);
    }

    @PostMapping("/deleteReservation")
    public void delete(@RequestBody Map<String, Long> request){

        reservationService.deleteReservation(request.get("reservationId"));
    }

    @GetMapping("/getReservationsNum")
    public ResponseEntity<String> getReservationsNum(@AuthenticationPrincipal LaboUser laboUser){

        return reservationService.getReservationsNum(laboUser);
    }

    @GetMapping("/getReservations")
    public ResponseEntity<List<ReservationsResponse>> getReservations(){

        return reservationService.getReservations();
    }

    @GetMapping("/getUserReservations")
    public ResponseEntity<List<ReservationsResponse>> getReservations(@AuthenticationPrincipal LaboUser laboUser){

        return reservationService.getUserReservations(laboUser.getId());
    }
}