package com.example.equipment_manager.equipment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Data
@NoArgsConstructor
@Entity
public class UserNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private Integer userId;
    private Integer equipmentId;
    private String content;

    public UserNotification(Integer userId, Integer equipmentId, String content) {
        this.userId = userId;
        this.equipmentId = equipmentId;
        this.content = content;
    }
}