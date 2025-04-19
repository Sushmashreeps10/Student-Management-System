package com.student.studentapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Bean to use BCryptPasswordEncoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Security configuration for HTTP requests
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for testing APIs with Postman
                .authorizeHttpRequests(auth -> auth
                                // Public access for register, login, and student routes
                                .requestMatchers("/api/users/register", "/api/users/login", "/student/**", "/borrowed/**").permitAll()

                                // DELETE method for /api/borrowed/** requires authentication
                                .requestMatchers(HttpMethod.DELETE, "/api/borrowed/**").authenticated()

                                // Other requests require authentication
                                .anyRequest().authenticated()
                )
                .httpBasic(withDefaults()); // Use HTTP Basic Authentication or configure JWT as needed

        return http.build();
    }
}
