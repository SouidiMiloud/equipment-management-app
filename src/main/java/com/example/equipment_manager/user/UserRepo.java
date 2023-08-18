package com.example.equipment_manager.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface UserRepo extends JpaRepository<LaboUser, Integer> {

    Optional<LaboUser> findByEmail(String email);

    @Query("select u from LaboUser u where u.userRole=?1")
    List<LaboUser> getStudents(LaboUserRole role);
}
