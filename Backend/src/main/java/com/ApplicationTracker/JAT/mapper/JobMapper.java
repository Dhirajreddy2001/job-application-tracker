package com.ApplicationTracker.JAT.mapper;

import com.ApplicationTracker.JAT.dto.JobResponseDTO;
import com.ApplicationTracker.JAT.model.Job;

public class JobMapper {

    public static JobResponseDTO toDTO(Job job)
    {
        if (job == null) {
            return null;
        }

        JobResponseDTO dto = new JobResponseDTO();
        dto.setId(job.getId());
        dto.setRoleName(job.getRoleName());
        dto.setApplicationDate(job.getApplicationDate());
        dto.setStatus(job.getStatus());
        dto.setNotes(job.getNotes());
        dto.setCreatedAt(job.getCreatedAt());
        dto.setJobId(job.getJobId());
        dto.setJobDescription(job.getJobDescription());
        dto.setLocation(job.getLocation());
        dto.setSalaryRange(job.getSalaryRange());
        dto.setCompanyName(job.getCompanyName());

        return dto;
    }

    public static Job toEntity(JobResponseDTO dto) {
        if (dto == null) {
            return null;
        }

        Job job = new Job();
        job.setId(dto.getId());
        job.setRoleName(dto.getRoleName());
        job.setApplicationDate(dto.getApplicationDate());
        job.setStatus(dto.getStatus());
        job.setNotes(dto.getNotes());
        job.setCreatedAt(dto.getCreatedAt());
        job.setJobId(dto.getJobId());
        job.setJobDescription(dto.getJobDescription());
        job.setLocation(dto.getLocation());
        job.setSalaryRange(dto.getSalaryRange());
        job.setCompanyName(dto.getCompanyName());

        return job;
    }
}
