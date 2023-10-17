package com.example.equipment_manager.product;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Category category;
    private String imagePath;
    private String description;
    private LocalDateTime availableAt;


    public Product(String name, Category category, String imagePath, String description, LocalDateTime availableAt) {
        this.name = name;
        this.category = category;
        this.imagePath = imagePath;
        this.description = description;
        this.availableAt = availableAt;
    }
}