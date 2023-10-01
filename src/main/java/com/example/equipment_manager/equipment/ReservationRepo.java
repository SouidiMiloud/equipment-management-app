package com.example.equipment_manager.equipment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface ReservationRepo extends JpaRepository<Reservation, Long> {


    @Query("select r from Reservation r where r.reservationState=?1 and r.equipmentId=?2 order by r.endsAt desc")
    List<Reservation> getReservations(ReservationState state, Integer equipmentId);

    @Query("select r from Reservation r where r.reservationState<>?1 order by r.time desc")
    List<Reservation> getCheckedReservations(ReservationState state);

    @Query("select r from Reservation r where r.reservationState=?1 order by r.time")
    List<Reservation> getUncheckedReservations(ReservationState state);

    @Query("select r from Reservation r where r.userId=?1 order by r.time desc")
    List<Reservation> getUserReservations(Integer userId);

    @Query("select count(r) from Reservation r where r.reservationState=?1")
    int getUncheckedReservationsNum(ReservationState state);
}