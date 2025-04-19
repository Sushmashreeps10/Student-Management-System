package com.student.studentapi.repository;

import com.student.studentapi.model.Borrowed;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowedRepository extends JpaRepository<Borrowed, Long> {
    List<Borrowed> findByBookNameIgnoreCase(String bookName);    
}
