package com.student.studentapi.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.student.studentapi.model.User;
import com.student.studentapi.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        User existingUser = userRepository.findByEmail(email);

        if (existingUser != null && passwordEncoder.matches(password, existingUser.getPassword())) {
            return existingUser;
        }
        return null;
    }
}
