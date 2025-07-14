package com.ApplicationTracker.JAT.controller;

import com.ApplicationTracker.JAT.dto.UserDTO;
import com.ApplicationTracker.JAT.service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id, HttpSession session) {
       Long sessionUserId = (Long) session.getAttribute("userId");
       //System.out.println("Session User ID: " + sessionUserId);

    if (sessionUserId == null || !sessionUserId.equals(id)) {
        return ResponseEntity.status(403).body("Access denied");
    }

    UserDTO user = userService.getUserById(id);
    return ResponseEntity.ok(user);
        
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");

    if (userId == null) {
        return ResponseEntity.status(401).body("User not logged in");
    }

    UserDTO userDTO = userService.getUserById(userId);
    return ResponseEntity.ok(userDTO);
}


    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody UserDTO dto) {
        userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    // @PutMapping("/profile")
    // public ResponseEntity<Void> updateProfile(@RequestBody UserDTO updatedUserDetails, HttpSession session)
    // {
    //     Long userId = (Long) session.getAttribute("userId");
    //     if(userId == null)
    //     {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    //     }

    //     userService.updateUser(userId, updatedUserDetails);
    //     return ResponseEntity.ok().build();
    // }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
