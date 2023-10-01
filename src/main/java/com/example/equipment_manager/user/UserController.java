package com.example.equipment_manager.user;

import com.example.equipment_manager.equipment.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;


@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> newUser(@RequestBody UserRequest request){

        return userService.saveUser(request);
    }

    @GetMapping("/getNameAndRole")
    public ResponseEntity<Map<String, String>> getNameAndRole(@AuthenticationPrincipal LaboUser user){

        return userService.getNameAndRole(user);
    }

    @GetMapping("/getMaterialInfo")
    public ResponseEntity<Map<String, String>> getMaterialInfo(@RequestParam String productId){

        return userService.getMaterialInfo(Integer.parseInt(productId));
    }

    @PostMapping("/addEquipment")
    public ResponseEntity<String> newEquipment(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("description") String desc,
                                               @RequestParam("category") Category categ, @RequestParam("productId") String productId) throws IOException{

        return userService.saveEquipment(name, categ, desc, file, productId);
    }

    @PostMapping("/removeMaterial")
    public void removeMaterial(@RequestBody Map<String, Integer> request){

        userService.removeMaterial(request.get("id"));
    }

    @GetMapping("/getMaterials")
    public ResponseEntity<List<Equipment>> getMaterials(@RequestParam String category, @RequestParam String searchTerm){

        return userService.getMaterials(category, searchTerm);
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
    public void confirm(@AuthenticationPrincipal LaboUser user, @RequestBody Map<String, Long> request){

        userService.confirmReservation(user, request.get("reservationId"));
    }

    @PostMapping("/rejectReservation")
    public void reject(@AuthenticationPrincipal LaboUser user, @RequestBody Map<String, Object> request){

        userService.rejectReservation(user, request);
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

    @GetMapping("/getStudents")
    public ResponseEntity<List<LaboUser>> getStudents(){

        return userService.getStudents();
    }
}