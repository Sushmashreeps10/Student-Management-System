package com.student.studentapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.studentapi.model.Student;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
