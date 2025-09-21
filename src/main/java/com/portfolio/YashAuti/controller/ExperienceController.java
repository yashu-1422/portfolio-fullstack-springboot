package com.portfolio.YashAuti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.portfolio.YashAuti.model.Experience;
import com.portfolio.YashAuti.service.ExperienceService;


@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = "*")
public class ExperienceController {
    @Autowired
    private ExperienceService experienceService;

    @GetMapping
    public List<Experience> getAllExperience() {
        return experienceService.getAllExperience();
    }
}
