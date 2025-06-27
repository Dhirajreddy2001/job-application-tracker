package com.ApplicationTracker.JAT.repository;

import com.ApplicationTracker.JAT.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findByUser_Id(Long userId);
    Optional<Job> findByUser_IdAndJobId(Long userId, Long jobId);
    
}
