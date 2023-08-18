package com.example.equipment_manager.login;

import com.example.equipment_manager.user.LaboUser;
import lombok.AllArgsConstructor;
import lombok.Data;



@Data
@AllArgsConstructor
public class TokenResponse {

    private LaboUser user;
    private String token;
}