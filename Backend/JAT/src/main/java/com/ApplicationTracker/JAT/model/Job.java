package com.ApplicationTracker.JAT.model;

import java.sql.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "\"JAT_JOBS\"", schema = "\"SYSTEM\"")
@Data
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name ="USER_ID",nullable = false)
    private User user;

    @Column(name = "ROLE_NAME",nullable = false)
    private String roleName;

    @Column(name = "APPLICATION_DATE")
    private LocalDate applicationDate;

    @Column(name="STATUS")
    private String status;

    @Column(name="NOTES", columnDefinition = "CLOB")
    private String notes;

    @Column(name="CREATED_AT")
    private Timestamp createdAt;

    @Column(name="JOB_ID")
    private Long jobId;

    @Column(name="JOB_DESCRIPTION",columnDefinition = "CLOB")
    private String jobDescription;

    @Column(name = "LOCATION")
    private String location;

    @Column(name = "SALARY_RANGE")
    private String salaryRange;

    @Column(name = "COMPANY_NAME")
    private String companyName;
   
}