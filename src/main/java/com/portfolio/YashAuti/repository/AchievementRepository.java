package com.portfolio.YashAuti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.portfolio.YashAuti.model.Achievements;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievements, Long> {
    @Query("SELECT a FROM Achievements a WHERE a.user.username = :username")
    List<Achievements> findByUsername(@Param("username") String username);
}