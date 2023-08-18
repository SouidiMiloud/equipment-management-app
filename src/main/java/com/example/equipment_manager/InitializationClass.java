package com.example.equipment_manager;

import com.example.equipment_manager.user.LaboUser;
import com.example.equipment_manager.user.LaboUserRole;
import com.example.equipment_manager.user.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;


@AllArgsConstructor
@Component
public class InitializationClass implements CommandLineRunner {

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        String username = "admin1@gmail.com";
        Optional<LaboUser> admin = userRepo.findByEmail(username);
        if(admin.isEmpty()) {
            String password = passwordEncoder.encode("admin123");
            userRepo.save(new LaboUser("admin", "admin", null, null, username, "000000000", password, LaboUserRole.ADMIN));
        }
    }
}
