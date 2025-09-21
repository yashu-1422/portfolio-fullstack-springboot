package com.portfolio.YashAuti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.portfolio.YashAuti.model.Project;
import com.portfolio.YashAuti.repository.ProjectRepository;

@Service
public class ProjectServices {
    @Autowired
    private ProjectRepository projectRepository;

    /**
     * Fetches a paginated list of all projects.
     * This is where you would add any business logic, e.g., filtering, data transformation.
     * @param pageable The pagination information (page number and size).
     * @return A Page of Project objects.
     */
    public Page<Project> getAllProjects(Pageable pageable) {
        // Currently, it just passes the request to the repository,
        // but complex logic would go here.
        return projectRepository.findAll(pageable);
    }
}