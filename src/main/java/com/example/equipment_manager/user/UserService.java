package com.example.equipment_manager.user;

import com.example.equipment_manager.equipment.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.Notification;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
@AllArgsConstructor
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepo userRepo;
    private EquipmentRepo equipmentRepo;
    private ReservationRepo reservationRepo;
    private NotificationRepo notificationRepo;

    public ResponseEntity<Map<String, String>> saveUser(UserRequest request) {

        Map<String, String> map = request.validate();

        Optional<LaboUser> user = userRepo.findByEmail(request.getEmail());
        if (user.isPresent() && !map.containsKey("email"))
            map.put("email", String.format("%s exist déjà", request.getEmail()));
        if (!map.isEmpty())
            return ResponseEntity.badRequest().body(map);

        String password = passwordEncoder.encode(request.getPassword());
        LaboUser laboUser = new LaboUser(request.getFirst_name(), request.getLast_name(), request.getLevel(), request.getField(),
                request.getEmail(), request.getPhone(), password, LaboUserRole.STUDENT);
        userRepo.save(laboUser);
        map.put("saved", String.format("%s enregistré avec succès", laboUser.getEmail()));
        return ResponseEntity.ok().body(map);
    }

    public ResponseEntity<String> saveEquipment(Equipment equipment) {

        equipment.setAvailableAt(LocalDateTime.now());
        equipmentRepo.save(equipment);
        return ResponseEntity.ok().body("saved successfully");
    }

    public ResponseEntity<List<Equipment>> getMaterials() {

        return ResponseEntity.ok().body(equipmentRepo.findAll());
    }

    public ResponseEntity<String> saveReservation(LaboUser user, Reservation reservation) {

        if(reservation.getStartsAt().isBefore(LocalDateTime.now().minusMinutes(5)) || reservation.getStartsAt().isAfter(reservation.getEndsAt()))
            return ResponseEntity.ok().body("veillez choisir des dates valides");

        Equipment equipment = equipmentRepo.findById(reservation.getEquipmentId()).orElseThrow();
        if(!isAvailable(reservation))
            return ResponseEntity.ok().body(equipment.getName() + " est non disponible pendant la durée spécifiée");

        equipment.setAvailableAt(reservation.getEndsAt());
        equipmentRepo.save(equipment);
        reservation.setUserId(user.getId());
        reservationRepo.save(reservation);
        return ResponseEntity.ok().body("votre demande a bien été enregistrée");
    }
    private boolean isAvailable(Reservation reservation){
        List<Reservation> reservations = reservationRepo.getReservations(reservation.getEquipmentId());
        for(int i=0; i != reservations.size(); i++){
            if(!reservations.get(i).getReservationState().equals(ReservationState.CONFIRMED))
                continue;
            if((reservation.getStartsAt().isAfter(reservations.get(i).getStartsAt()) && reservation.getStartsAt().isBefore(reservations.get(i).getEndsAt()))
                || (reservation.getEndsAt().isAfter(reservations.get(i).getStartsAt()) && reservation.getEndsAt().isBefore(reservations.get(i).getEndsAt())))
                return false;
        }
        return true;
    }

    public ResponseEntity<EquipmentResponse> availableAt(Integer equipmentId) {

        Equipment equipment = equipmentRepo.findById(equipmentId).orElseThrow();
        EquipmentResponse response = new EquipmentResponse();
        response.setName(equipment.getName());
        response.setCategory(equipment.getCategory());
        response.setImagePath(equipment.getImagePath());
        response.setDescription(equipment.getDescription());
        List<Reservation> reservations = reservationRepo.getReservations(equipmentId);
        if (reservations.size() != 0) {
            LocalDateTime end = reservations.get(0).getEndsAt();
            if (end.isAfter(LocalDateTime.now()))
                response.setMessage("disponible le " + end.format(DateTimeFormatter.ofPattern("dd-MM")) + " a " + end.format(DateTimeFormatter.ofPattern("HH:mm")));
            else
                response.setMessage("disponible maintenant");
        } else
            response.setMessage("disponible maintenant");
        return ResponseEntity.ok().body(response);
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
        reservation.setEquipmentId(r.getEquipmentId());
        reservation.setUserName(userRepo.findById(r.getUserId()).get().getFirst_name() + ' ' + userRepo.findById(r.getUserId()).get().getLast_name());
        reservation.setEquipmentName(equipmentRepo.findById(r.getEquipmentId()).get().getName());
        reservation.setTime(r.getTime().format(formatter));
        reservation.setStartsAt(r.getStartsAt().format(formatter));
        reservation.setEndsAt(r.getEndsAt().format(formatter));
        reservation.setReservationState(r.getReservationState().toString());
        return reservation;
    }

    public void confirmReservation(Long reservationId) {

        Reservation reservation = reservationRepo.findById(reservationId).orElseThrow();
        reservation.setReservationState(ReservationState.CONFIRMED);

        UserNotification notification = new UserNotification(reservation.getUserId(), reservation.getEquipmentId(), "");
        notificationRepo.save(notification);

        reservationRepo.save(reservation);
    }

    public void rejectReservation(Map<String, Object> request) {

        Long reservationId = Long.parseLong(request.get("reservationId").toString());
        Reservation reservation = reservationRepo.findById(reservationId).orElseThrow();

        UserNotification notification = new UserNotification(reservation.getUserId(), reservation.getEquipmentId(), request.get("message").toString());
        notificationRepo.save(notification);

        reservation.setReservationState(ReservationState.REJECTED);
        reservationRepo.save(reservation);
    }

    public void deleteReservation(Long reservationId) {

        reservationRepo.deleteById(reservationId);
    }

    public ResponseEntity<String> getReservationsNum(LaboUser laboUser) {
        int reservations;
        if(laboUser.getUserRole().equals(LaboUserRole.ADMIN))
            reservations = reservationRepo.getUncheckedReservationsNum(ReservationState.UNCHECKED);
        else
            reservations = notificationRepo.getNotificationsNum(laboUser.getId());
        return ResponseEntity.ok().body(Integer.toString(reservations));
    }

    public ResponseEntity<List<ReservationsResponse>> getUserReservations(Integer id) {

        List<ReservationsResponse> reservations = new ArrayList<>();
        List<Reservation> reservationList = reservationRepo.getUserReservations(id);
        for(Reservation r : reservationList)
            reservations.add(getReservationResponse(r));
        return ResponseEntity.ok().body(reservations);
    }

    public ResponseEntity<UserNotification> getNotif(Integer userId) {

        List<UserNotification> notifications = notificationRepo.getNotifications(userId);
        for(int i=0; i != notifications.size(); i++)
            if(notifications.get(i).getContent().isEmpty())
                notificationRepo.deleteById(notifications.get(i).getId());
        for(int i=0; i != notifications.size(); i++){
            if(!notifications.get(i).getContent().isEmpty())
                return ResponseEntity.ok().body(notifications.get(i));
        }
        return ResponseEntity.ok().body(new UserNotification());
    }

    public void removeNotif(Integer notifId) {

        notificationRepo.deleteById(notifId);
    }

    public ResponseEntity<List<LaboUser>> getStudents() {

        return ResponseEntity.ok().body(userRepo.getStudents(LaboUserRole.STUDENT));
    }
}

// ^\\d{10}$