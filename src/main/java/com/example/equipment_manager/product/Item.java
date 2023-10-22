package com.example.equipment_manager.product;

import com.example.equipment_manager.reservation.Reservation;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private LocalDateTime availableAt;
    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;
    public Item(Product product){
        this.product = product;
        availableAt = LocalDateTime.now();
    }
}