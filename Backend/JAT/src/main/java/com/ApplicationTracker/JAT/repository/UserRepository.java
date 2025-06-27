package com.ApplicationTracker.JAT.repository;

import com.ApplicationTracker.JAT.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmail(String email);
}
