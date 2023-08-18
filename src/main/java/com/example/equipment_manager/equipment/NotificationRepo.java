package com.example.equipment_manager.equipment;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepo extends JpaRepository<UserNotification, Integer> {

    @Query("select n from UserNotification n where n.userId=?1")
    List<UserNotification> getNotifications(Integer userId);

    @Query("select count(n) from UserNotification n where n.userId=?1")
    int getNotificationsNum(Integer userId);
}