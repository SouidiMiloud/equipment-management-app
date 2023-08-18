package com.example.equipment_manager.equipment;

import org.springframework.data.jpa.repository.JpaRepository;


public interface EquipmentRepo extends JpaRepository<Equipment, Integer> {
}