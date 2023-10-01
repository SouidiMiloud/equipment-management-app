package com.example.equipment_manager.equipment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface EquipmentRepo extends JpaRepository<Equipment, Integer> {

    @Query("select e from Equipment e where e.category=?1 and e.name like %?2%")
    List<Equipment> getFilteredMaterials(Category category, String search);

    @Query("select e from Equipment e where e.name like %?1%")
    List<Equipment> searchMaterials(String search);
}