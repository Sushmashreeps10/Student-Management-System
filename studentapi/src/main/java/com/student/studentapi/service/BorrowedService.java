package com.student.studentapi.service;

import com.student.studentapi.model.Borrowed;
import com.student.studentapi.repository.BorrowedRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class BorrowedService {

    @Autowired
    private BorrowedRepository borrowedRepository;

    public Borrowed submitBorrowed(Borrowed borrowed) {
        return borrowedRepository.save(borrowed);
    }

    public List<Borrowed> fetchAllBorrowed() {
        return borrowedRepository.findAll();
    }

    public void deleteBorrowed(Long id) {
        borrowedRepository.deleteById(id);
    }

    public Optional<Borrowed> updateBorrowed(Long id, Borrowed updateBorrowed) {
        return borrowedRepository.findById(id).map(borrowed -> {
            borrowed.setBookName(updateBorrowed.getBookName());
            borrowed.setStudentName(updateBorrowed.getStudentName());
            borrowed.setRollNo(updateBorrowed.getRollNo());
            borrowed.setBorrowedDate(updateBorrowed.getBorrowedDate());
            return borrowedRepository.save(borrowed);
        });
    }

    public List<Borrowed> getBorrowedByBookName(String bookName) {
        return borrowedRepository.findByBookNameIgnoreCase(bookName);
    }
}
