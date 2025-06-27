package com.ApplicationTracker.JAT.dto;

import java.sql.Timestamp;
import java.time.LocalDate;

import lombok.Data;

@Data
public class JobResponseDTO {
    private Long id;
    private Long userId;
    private String roleName;
    private LocalDate applicationDate;
    private String status;
    private String notes;
    private Timestamp createdAt;
    private Long jobId;
    private String jobDescription;
    private String location;
    private String salaryRange;
    private String companyName;
}
// This DTO is used to transfer job data between the backend and frontend.