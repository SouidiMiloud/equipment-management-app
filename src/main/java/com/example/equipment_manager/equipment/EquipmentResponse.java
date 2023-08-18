package com.example.equipment_manager.equipment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentResponse {

    private String name;
    private Category category;
    private String imagePath;
    private String description;
    private String message;
}
