package com.ApplicationTracker.JAT.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

import com.ApplicationTracker.JAT.dto.JobRequestDTO;
import com.ApplicationTracker.JAT.model.Job;
import com.ApplicationTracker.JAT.model.User;
import com.ApplicationTracker.JAT.repository.JobRepository;
import com.ApplicationTracker.JAT.repository.UserRepository;

@Service
public class JobService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JobRepository jobRepository;

    public List<Job> getJobsByUserId(Long userId){
       
        return jobRepository.findByUser_Id(userId);

    }

    public Job createJob(JobRequestDTO jobDto)
    {
        Job job = new Job();
        job.setRoleName(jobDto.getRoleName());
        job.setApplicationDate(jobDto.getApplicationDate());
        job.setStatus(jobDto.getStatus());
        job.setNotes(jobDto.getNotes());
        job.setCreatedAt(jobDto.getCreatedAt());
        job.setJobId(jobDto.getJobId());
        job.setJobDescription(jobDto.getJobDescription());
        job.setLocation(jobDto.getLocation());
        job.setSalaryRange(jobDto.getSalaryRange());
        job.setCompanyName(jobDto.getCompanyName());
        
        User user = userRepository.findById(jobDto.getUserId())
            .orElseThrow(() -> new NoSuchElementException("404 :User Not Found"));
        job.setUser(user);

        return jobRepository.save(job);
    }


    public Job getJobsByUserIdAndJobId(Long userId, Long jobId) {
        return jobRepository.findByUser_IdAndJobId(userId,jobId)
            .orElseThrow(() -> new NoSuchElementException("404 :Job Not Found"));
    }

    public Job updateJob(Long userId, Long jobId, JobRequestDTO updated_job) {
        
        Job job = getJobsByUserIdAndJobId(userId, jobId);
        
        if(updated_job.getRoleName() != null) { job.setRoleName(updated_job.getRoleName());}
        if(updated_job.getApplicationDate() != null) { job.setApplicationDate(updated_job.getApplicationDate());}
        if(updated_job.getStatus() != null) { job.setStatus(updated_job.getStatus());}
        if(updated_job.getNotes() != null) { job.setNotes(updated_job.getNotes());}
        if(updated_job.getCreatedAt() != null) { job.setCreatedAt(updated_job.getCreatedAt());}
        if(updated_job.getJobId() != null) { job.setJobId(updated_job.getJobId());}
        if(updated_job.getJobDescription() != null) { job.setJobDescription(updated_job.getJobDescription());}
        if(updated_job.getLocation() != null) { job.setLocation(updated_job.getLocation());}
        if(updated_job.getSalaryRange() != null) { job.setSalaryRange(updated_job.getSalaryRange());}
        if(updated_job.getCompanyName() != null) { job.setCompanyName(updated_job.getCompanyName());}       

        return jobRepository.save(job);
    }

    public void deleteJob(Long userId, Long jobId) {
        Job job = getJobsByUserIdAndJobId(userId, jobId);
        jobRepository.delete(job);
    }





}
