package com.example.equipment_manager.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @GetMapping("/getNameAndRole")
    public ResponseEntity<Map<String, String>> getNameAndRole(@AuthenticationPrincipal LaboUser user){

        return userService.getNameAndRole(user);
    }

    @GetMapping("/getStudents")
    public ResponseEntity<List<LaboUser>> getStudents(){

        return userService.getStudents();
    }
}