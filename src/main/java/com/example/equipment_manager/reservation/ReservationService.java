package com.example.equipment_manager.reservation;

import com.example.equipment_manager.product.Product;
import com.example.equipment_manager.product.ProductRepo;
import com.example.equipment_manager.user.LaboUser;
import com.example.equipment_manager.user.LaboUserRole;
import com.example.equipment_manager.user.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ReservationService {

    private ReservationRepo reservationRepo;
    private UserRepo userRepo;
    private ProductRepo productRepo;
    private SimpMessagingTemplate messagingTemplate;

    public ResponseEntity<String> saveReservation(LaboUser user, Reservation reservation) {

        if(reservation.getStartsAt().isBefore(LocalDateTime.now().minusMinutes(5)) || reservation.getStartsAt().isAfter(reservation.getEndsAt()))
            return ResponseEntity.ok().body("veillez choisir des dates valides");

        Product product = productRepo.findById(reservation.getProductId()).orElseThrow();
        if(!isAvailable(reservation))
            return ResponseEntity.ok().body(product.getName() + " est non disponible pendant la durée spécifiée");

        productRepo.save(product);
        reservation.setUserId(user.getId());
        reservationRepo.save(reservation);

        messagingTemplate.convertAndSend("/topic/reservations", reservationRepo.getUncheckedReservationsNum(ReservationState.UNCHECKED));
        return ResponseEntity.ok().body("votre demande a bien été enregistrée");
    }
    private boolean isAvailable(Reservation reservation){
        List<Reservation> reservations = reservationRepo.getReservations(ReservationState.CONFIRMED, reservation.getProductId());
        for(int i=0; i != reservations.size(); i++){
            if(!reservations.get(i).getReservationState().equals(ReservationState.CONFIRMED))
                continue;
            if((reservation.getStartsAt().isAfter(reservations.get(i).getStartsAt()) && reservation.getStartsAt().isBefore(reservations.get(i).getEndsAt()))
                    || (reservation.getEndsAt().isAfter(reservations.get(i).getStartsAt()) && reservation.getEndsAt().isBefore(reservations.get(i).getEndsAt())))
                return false;
        }
        return true;
    }

    public ResponseEntity<List<ReservationsResponse>> getReservations() {
        List<ReservationsResponse> reservations = new ArrayList<>();
        List<Reservation> checkedReservations = reservationRepo.getCheckedReservations(ReservationState.UNCHECKED);
        List<Reservation> uncheckedReservations = reservationRepo.getUncheckedReservations(ReservationState.UNCHECKED);

        for(Reservation r : uncheckedReservations)
            reservations.add(getReservationResponse(r));
        for(Reservation r : checkedReservations)
            reservations.add(getReservationResponse(r));

        return ResponseEntity.ok().body(reservations);
    }
    private ReservationsResponse getReservationResponse(Reservation r){
        ReservationsResponse reservation = new ReservationsResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        reservation.setId(r.getId());
        reservation.setUserId(r.getUserId());
        reservation.setProductId(r.getProductId());
        reservation.setUserName(userRepo.findById(r.getUserId()).get().getFirst_name() + ' ' + userRepo.findById(r.getUserId()).get().getLast_name());
        reservation.setProductName(productRepo.findById(r.getProductId()).get().getName());
        reservation.setTime(r.getTime().format(formatter));
        reservation.setStartsAt(r.getStartsAt().format(formatter));
        reservation.setEndsAt(r.getEndsAt().format(formatter));
        reservation.setReservationState(r.getReservationState().toString());
        reservation.setMessage(r.getMessage());
        return reservation;
    }

    public void confirmReservation(LaboUser user, Long reservationId) {

        Reservation reservation = reservationRepo.findById(reservationId).orElseThrow();
        reservation.setReservationState(ReservationState.CONFIRMED);
        Product product = productRepo.findById(reservation.getProductId()).orElseThrow();
        product.setAvailableAt(reservation.getEndsAt());
        productRepo.save(product);

        reservationRepo.save(reservation);

        messagingTemplate.convertAndSend("/topic/reservations", user.getUnreadNotifications());
        LaboUser laboUser = userRepo.findById(reservation.getUserId()).orElseThrow();
        laboUser.setUnreadNotifications(laboUser.getUnreadNotifications() + 1);
        userRepo.save(laboUser);
        messagingTemplate.convertAndSendToUser(laboUser.getEmail(), "/private", laboUser.getUnreadNotifications());
    }

    public void rejectReservation(LaboUser user, Map<String, Object> request) {

        Long reservationId = Long.parseLong(request.get("reservationId").toString());
        Reservation reservation = reservationRepo.findById(reservationId).orElseThrow();
        reservation.setReservationState(ReservationState.REJECTED);
        reservation.setMessage(request.get("message").toString());
        reservationRepo.save(reservation);

        messagingTemplate.convertAndSend("/topic/reservations", user.getUnreadNotifications());
        LaboUser laboUser = userRepo.findById(reservation.getUserId()).orElseThrow();
        laboUser.setUnreadNotifications(laboUser.getUnreadNotifications() + 1);
        userRepo.save(laboUser);
        messagingTemplate.convertAndSendToUser(laboUser.getEmail(), "/private", laboUser.getUnreadNotifications());
    }

    public void deleteReservation(Long reservationId) {

        reservationRepo.deleteById(reservationId);
    }

    public ResponseEntity<List<ReservationsResponse>> getUserReservations(Integer id) {

        LaboUser user = userRepo.findById(id).orElseThrow();
        user.setUnreadNotifications(0);
        userRepo.save(user);
        List<ReservationsResponse> reservations = new ArrayList<>();
        List<Reservation> reservationList = reservationRepo.getUserReservations(id);
        for (Reservation r : reservationList)
            reservations.add(getReservationResponse(r));
        return ResponseEntity.ok().body(reservations);
    }

    public ResponseEntity<String> getReservationsNum(LaboUser laboUser) {

        int reservations;
        if(laboUser.getUserRole().equals(LaboUserRole.ADMIN))
            reservations = reservationRepo.getUncheckedReservationsNum(ReservationState.UNCHECKED);
        else
            reservations = laboUser.getUnreadNotifications();
        return ResponseEntity.ok().body(String.valueOf(reservations));
    }
}