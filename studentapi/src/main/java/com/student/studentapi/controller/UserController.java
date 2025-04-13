package com.student.studentapi.controller;

import com.student.studentapi.model.User;
import com.student.studentapi.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")  // Ensure the frontend port is correct
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor

public class UserController {

    // @Autowired
    private final UserService userService;


    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User existingUser = userService.loginUser(user.getEmail(), user.getPassword());
    
        if (existingUser != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }}
    