package com.example.equipment_manager.product;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


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
    private Integer stock;
    private Integer availableItems;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Item> items;

    public Product(String name, Category category, String imagePath, String description, Integer stock) {
        this.name = name;
        this.category = category;
        this.imagePath = imagePath;
        this.description = description;
        this.stock = stock;
        availableItems = stock;
    }
}