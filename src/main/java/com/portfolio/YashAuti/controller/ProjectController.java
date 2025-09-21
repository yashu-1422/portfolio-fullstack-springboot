package com.portfolio.YashAuti.controller;

import com.portfolio.YashAuti.model.Project;
import com.portfolio.YashAuti.service.ProjectServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {
    @Autowired
    private ProjectServices projectServices;

    @GetMapping
    public Page<Project> getProjects(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return projectServices.getAllProjects(pageable);
    }
}
    /* 
    // Optional: Use this method to pre-populate your database for testing
    @PostConstruct
    public void seedDatabase() {
        if (projectRepository.count() == 0) {
            projectRepository.save(new Project(null, "Hospital Management System", "Developed a RESTful API for a hospital management system.", "Java, Spring Boot, MySQL", "https://github.com/your-github/hms-repo"));
            projectRepository.save(new Project(null, "Student Management System", "Built a console-based application for managing student records.", "Java, JDBC, MySQL", "https://github.com/your-github/sms-repo"));
            projectRepository.save(new Project(null, "Personal Portfolio Website", "A full-stack website to showcase my technical projects.", "Spring Boot, HTML, CSS, JavaScript", "https://github.com/your-github/portfolio-repo"));
        }
    }
    */
