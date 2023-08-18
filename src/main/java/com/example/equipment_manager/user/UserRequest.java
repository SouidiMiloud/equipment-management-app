package com.example.equipment_manager.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


import java.util.HashMap;
import java.util.Map;


@Getter
@Setter
@AllArgsConstructor
public class UserRequest {

    private String first_name;
    private String last_name;
    private Level level;
    private Field field;
    private String email;
    private String phone;
    private String password;
    private String confirm_password;


    public Map<String, String> validate(){

        Map<String, String> errors = new HashMap<>();
        if(first_name.isEmpty())
            errors.put("first_name", "tapez votre prénom");
        if(last_name.isEmpty())
            errors.put("last_name", "tapez votre nom");
        if(password.isEmpty())
            errors.put("password", "tapez votre mot de passe");
        else if(password.length() < 6)
            errors.put("password", "tapez au moins 6 caractères");
        if(!password.equals(confirm_password))
            errors.put("confirm_password", "le mot de passe ne correspond pas");
        if(email.isEmpty())
            errors.put("email", "tapez votre email");
        else if(!isValidEmail())
            errors.put("email", "email non valide");
        if(phone.isEmpty())
            errors.put("phone", "tapez votre numéro de téléphone");
        else if(!phone.matches("\\d+"))
            errors.put("phone", "numéro de téléphone non valide");

        return errors;
    }

    boolean isValidEmail(){

        if(!email.contains("@") || email.charAt(0) == '.' || Character.isDigit(email.charAt(0)))
            return false;
        int arobase = email.indexOf('@');
        if(arobase == 0)
            return false;
        if(!email.endsWith("@gmail.com") && !email.endsWith("@inemail.ine.inpt.ma") && !email.endsWith("@ine.inpt.ma"))
            return false;

        for(int i=0; i != arobase; i++) {
            if (!Character.isLetterOrDigit(email.charAt(i)) && email.charAt(i) != '.')
                return false;
            if(email.charAt(i) == email.charAt(i + 1) && email.charAt(i) == '.')
                return false;
        }
        return true;
    }
}