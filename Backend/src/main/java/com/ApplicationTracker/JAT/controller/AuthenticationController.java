package com.ApplicationTracker.JAT.controller;

import java.security.Security;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ApplicationTracker.JAT.dto.LoginRequestDTO;
import com.ApplicationTracker.JAT.model.User;
import com.ApplicationTracker.JAT.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest,HttpSession session)
    {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if(userOptional.isPresent())
        {
            User user = userOptional.get();
            // Check if the password matches
            if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
            {
                // Store user info in session
                UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(
                    user.getEmail(), 
                    null,
                    
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
                );
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authentication);
                SecurityContextHolder.setContext(securityContext);
                System.out.println("Session ID: " + session.getId());
                System.out.println("Session class: " + session.getClass());
                session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
                session.setAttribute("userId", user.getId());
          
                return ResponseEntity.ok("Login successful");
            }
        }
        return ResponseEntity.status(401).body("Login failed: Incorrect email or password");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session)
    {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");     
    }

}
