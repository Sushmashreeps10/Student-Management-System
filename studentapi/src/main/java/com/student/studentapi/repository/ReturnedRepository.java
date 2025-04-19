package com.student.studentapi.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.studentapi.model.Returned;

@Repository
public interface ReturnedRepository  extends JpaRepository<Returned, Long> {
    List<Returned> findByBookNameIgnoreCase(String bookName);  
}
