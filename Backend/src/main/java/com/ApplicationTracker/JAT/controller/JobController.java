package com.ApplicationTracker.JAT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("user/{userId}")
    public List<Job> getJobsByUserId(@PathVariable Long userId){
        return jobRepository.findByUser_Id(userId);
    }
    @GetMapping("user/{userId}/job/{jobId}")
    public ResponseEntity<Job> getJobByUserAndJob_Id(@PathVariable Long userId, @PathVariable Long jobId)
    {
        Job job = jobService.getJobsByUserIdAndJobId(userId,jobId);
        return ResponseEntity.ok(job);
    }
    //CRUD Operations <<-- Start -->>
    @PostMapping
    public ResponseEntity<Void> createJob(@RequestBody JobRequestDTO job)
    {
        jobService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PutMapping("/user/{userId}/job/{jobId}")
    public ResponseEntity<Void> updateJob( 
        @PathVariable Long userId, 
        @PathVariable Long jobId, 
        @RequestBody JobRequestDTO updated_job){
                jobService.updateJob(userId,jobId,updated_job);
                return ResponseEntity.ok().build();
    
    }
    @DeleteMapping("/user/{userId}/job/{jobId}")
    public ResponseEntity<String> deleteJob(
        @PathVariable Long userId,
        @PathVariable Long jobId
    ){
        jobService.deleteJob(userId,jobId);
        return ResponseEntity.noContent().build();
    }
    
}
