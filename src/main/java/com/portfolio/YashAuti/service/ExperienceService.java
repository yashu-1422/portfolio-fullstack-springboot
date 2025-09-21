package com.portfolio.YashAuti.service;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.portfolio.YashAuti.model.Experience;
import com.portfolio.YashAuti.repository.ExperienceRepository;
import java.util.List;

@Service
public class ExperienceService {
    @Autowired
    private ExperienceRepository experienceRepository;

    public List<Experience> getAllExperience() {
        return experienceRepository.findAll();
    }
}


