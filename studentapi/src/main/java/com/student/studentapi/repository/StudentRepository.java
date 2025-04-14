package com.student.studentapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.studentapi.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByBranchIgnoreCase(String branch);

}
