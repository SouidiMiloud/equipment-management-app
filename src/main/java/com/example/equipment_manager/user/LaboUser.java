package com.example.equipment_manager.user;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


@Entity
@Data
@NoArgsConstructor
public class LaboUser implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String first_name;
    private String last_name;
    private String email;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Field field;
    @Enumerated(EnumType.STRING)
    private Level level;
    @JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
    private String password;
    @Enumerated(EnumType.STRING)
    private LaboUserRole userRole;
    private Integer unreadNotifications;


    public LaboUser(String first_name, String last_name, Level level, Field field, String email, String phone, String password, LaboUserRole userRole) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.field = field;
        this.level = level;
        this.password = password;
        this.userRole = userRole;
        unreadNotifications = 0;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}