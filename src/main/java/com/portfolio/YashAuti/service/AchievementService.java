package com.portfolio.YashAuti.service;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import java.util.List;

import com.portfolio.YashAuti.model.Achievements;
import com.portfolio.YashAuti.repository.AchievementRepository;

@Service
public class AchievementService {
    @Autowired
    private AchievementRepository achievementRepository;

    public List<Achievements> getAllAchievements() {
        return achievementRepository.findAll();
    }
}



