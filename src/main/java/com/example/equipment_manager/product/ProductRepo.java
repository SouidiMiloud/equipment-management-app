package com.example.equipment_manager.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductRepo extends JpaRepository<Product, Integer> {

    @Query("select p from Product p where p.category=?1 and p.name like %?2%")
    List<Product> getFilteredProducts(Category category, String search);

    @Query("select p from Product p where p.name like %?1%")
    List<Product> searchProducts(String search);
}