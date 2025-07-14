package com.ApplicationTracker.JAT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import com.ApplicationTracker.JAT.dto.JobRequestDTO;
import com.ApplicationTracker.JAT.model.Job;
import com.ApplicationTracker.JAT.repository.JobRepository;
import com.ApplicationTracker.JAT.service.JobService;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobService jobService;

    // 1. Get all jobs for a user (not paginated)
    @GetMapping("user/{userId}")
    public List<Job> get(@PathVariable Long userId) {
        return jobRepository.findByUser_Id(userId);
    }

    // 2. Get a specific job for a user
    @GetMapping("user/{userId}/job/{jobId}")
    public ResponseEntity<Job> getJobByUserAndJob_Id(@PathVariable Long userId, @PathVariable Long jobId) {
        Job job = jobService.getJobsByUserIdAndJobId(userId, jobId);
        return ResponseEntity.ok(job);
    }

    // 3. Get top 5 recent jobs for dashboard
    @GetMapping("/recents")
    public ResponseEntity<List<Job>> getRecentJobs(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(jobService.getTop5JobsByUserId(userId));
    }

    // 4. Get paginated jobs with optional search and filter
    @GetMapping
    public ResponseEntity<Page<Job>> getPaginatedJobs(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String status,
        @RequestParam(defaultValue = "id") String sortField,
        @RequestParam(defaultValue = "desc") String sortOrder,
        HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortField).ascending()
                : Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Job> jobs = jobService.getPaginatedJobs(userId, pageable, status, search);
        return ResponseEntity.ok(jobs);
    }

    // 5. Create new job
    @PostMapping
    public ResponseEntity<Void> createJob(@RequestBody JobRequestDTO job, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        job.setUserId(userId);
        jobService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 6. Update job status (inline dropdown)
    @PatchMapping("/user/{userId}/job/{jobId}/status")
    public ResponseEntity<Void> updateJobStatus(
        @PathVariable Long userId,
        @PathVariable Long jobId,
        @RequestParam String newStatus
    ) {
        jobService.updateJobStatus(userId, jobId, newStatus);
        return ResponseEntity.ok().build();
    }

    // 7. Edit job details
    @PatchMapping("/user/{userId}/job/{jobId}")
    public ResponseEntity<Void> updateJob(
        @PathVariable Long userId,
        @PathVariable Long jobId,
        @RequestBody JobRequestDTO updated_job
    ) {
        jobService.updateJob(userId, jobId, updated_job);
        return ResponseEntity.ok().build();
    }

    // 8. Delete job
    @DeleteMapping("/user/{userId}/job/{jobId}")
    public ResponseEntity<Void> deleteJob(
        @PathVariable Long userId,
        @PathVariable Long jobId
    ) {
        jobService.deleteJob(userId, jobId);
        return ResponseEntity.noContent().build();
    }
}
