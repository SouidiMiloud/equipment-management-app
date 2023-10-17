package com.example.equipment_manager.login;

import com.example.equipment_manager.filters.JwtUtil;
import com.example.equipment_manager.user.LaboUser;
import com.example.equipment_manager.user.LaboUserRole;
import com.example.equipment_manager.user.UserRepo;
import com.example.equipment_manager.user.UserRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/authentication")
@AllArgsConstructor
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> newUser(@RequestBody UserRequest request){

        Map<String, String> map = request.validate();

        Optional<LaboUser> user = userRepo.findByEmail(request.getEmail());
        if (user.isPresent() && !map.containsKey("email"))
            map.put("email", String.format("%s exist déjà", request.getEmail()));
        if (!map.isEmpty())
            return ResponseEntity.badRequest().body(map);

        String password = passwordEncoder.encode(request.getPassword());
        LaboUser laboUser = new LaboUser(request.getFirst_name(), request.getLast_name(), request.getLevel(), request.getField(),
                request.getEmail(), request.getPhone(), password, LaboUserRole.STUDENT);
        userRepo.save(laboUser);
        map.put("saved", String.format("%s enregistré avec succès", laboUser.getEmail()));
        return ResponseEntity.ok().body(map);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginCredentials credentials){

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getEmail(), credentials.getPassword()
                    )
            );
            LaboUser user = (LaboUser) authentication.getPrincipal();
            return ResponseEntity.ok().body(new TokenResponse(user, jwtUtil.generateToken(user)));
        }
        catch(BadCredentialsException exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}