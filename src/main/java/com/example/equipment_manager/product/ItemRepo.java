package com.example.equipment_manager.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemRepo extends JpaRepository<Item, Long> {
    List<Item> findAllByProduct(Product product);
}
