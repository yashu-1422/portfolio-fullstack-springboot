package com.portfolio.YashAuti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.portfolio.YashAuti.model.Experience;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    @Query("SELECT e FROM Experience e WHERE e.user.username = :username")
    List<Experience> findByUsername(@Param("username") String username);
}