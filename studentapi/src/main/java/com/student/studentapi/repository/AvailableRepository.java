package com.student.studentapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.studentapi.model.Available;

import java.util.List;

@Repository
public interface AvailableRepository extends JpaRepository<Available, Long> {
    List<Available> findByBookNameIgnoreCase(String bookName);
    
}
