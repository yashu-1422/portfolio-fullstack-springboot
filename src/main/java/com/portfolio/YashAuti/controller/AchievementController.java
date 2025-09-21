package com.portfolio.YashAuti.controller;
import com.portfolio.YashAuti.model.Achievements;
import com.portfolio.YashAuti.service.AchievementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST Controller for managing achievement-related API endpoints.
 * Handles HTTP requests from the frontend for the achievements section.
 */
@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "*")
public class AchievementController {
    @Autowired
    private AchievementService achievementService;

    @GetMapping
    public List<Achievements> getAllAchievements() {
        return achievementService.getAllAchievements();
    }
}
