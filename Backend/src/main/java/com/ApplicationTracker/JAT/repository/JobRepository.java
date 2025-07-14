package com.ApplicationTracker.JAT.repository;

import com.ApplicationTracker.JAT.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByUser_Id(Long userId);

    Page<Job> findByUser_Id(Long userId, Pageable pageable);

    Optional<Job> findByUser_IdAndId(Long userId, Long jobId);

    List<Job> findTop5ByUser_IdOrderByIdDesc(Long userId);

    @Query("SELECT j FROM Job j WHERE j.user.id = :userId " +
           "AND (:status IS NULL OR j.status = :status) " +
           "AND (:search IS NULL OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(j.roleName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Job> findByUserIdWithFilters(
        @Param("userId") Long userId,
        @Param("status") String status,
        @Param("search") String search,
        Pageable pageable
    );

    @Query("SELECT j FROM Job j WHERE j.user.id = :userId AND " +
           "(LOWER(j.companyName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(j.roleName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Job> findByUserIdAndSearch(
        @Param("userId") Long userId,
        @Param("search") String search,
        Pageable pageable
    );

    @Query("SELECT j FROM Job j WHERE j.user.id = :userId AND j.status = :status")
    Page<Job> findByUserIdAndStatus(
        @Param("userId") Long userId,
        @Param("status") String status,
        Pageable pageable
    );
}
