package com.itsupport.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectAssignment;
    private String ticketId;
    private String issueDescription;
    private String assignedEmployee;
    private String supportLevel;
    private String priority;
    private LocalDateTime generationTime;
    private LocalDateTime responseTime;
    private LocalDateTime resolutionTime;
    private String status;
}
