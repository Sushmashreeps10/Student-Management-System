package com.student.studentapi.controller;

import com.student.studentapi.model.Borrowed;
import com.student.studentapi.service.BorrowedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/borrowed")
@CrossOrigin("*")
public class BorrowedController {

    @Autowired
    private BorrowedService borrowedService;

    @PostMapping("/addBorrowed")
    public Borrowed addBorrowed(@RequestBody Borrowed borrowed) {
        return borrowedService.submitBorrowed(borrowed);
    }

    @GetMapping("/getAllBorrowed")
    public List<Borrowed> getAllBorroweds() {
        return borrowedService.fetchAllBorrowed();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBorrowed(@PathVariable Long id) {
        borrowedService.deleteBorrowed(id);
    }

    @PutMapping("/edit/{id}")
    public Optional<Borrowed> editBorrowed(@PathVariable Long id, @RequestBody Borrowed borrowed) {
        return borrowedService.updateBorrowed(id, borrowed);
    }

    @GetMapping("/bookName/{bookName}")
    public List<Borrowed> getBorrowedByBookName(@PathVariable String bookName) {
        return borrowedService.getBorrowedByBookName(bookName);
    }
}
