package com.ApplicationTracker.JAT.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
            http
                        .csrf().disable()
                        .authorizeHttpRequests(auth -> auth
                                                           .requestMatchers("/swagger-ui/**",
                                                                                        "/v3/api-docs/**",
                                                                                        "/api/test/**",
                                                                                        "/api/auth/**"
                                                                                        ).permitAll()
                                                              .requestMatchers("/api/users/**","/api/jobs/**").hasRole("USER")  
                                                           .anyRequest().authenticated()
                                                           )
                                                           .formLogin().disable()
                                                           .httpBasic().disable()
                                                           .sessionManagement(session -> session
                                                           .maximumSessions(1)
                                                           );

                                                           return http.build();
    
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
