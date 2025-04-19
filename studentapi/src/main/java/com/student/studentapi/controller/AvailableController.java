package com.student.studentapi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.studentapi.model.Available;
import com.student.studentapi.service.AvailableService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/available")
@CrossOrigin("*")
public class AvailableController {

    @Autowired
    private AvailableService availableService;

    @PostMapping("/addAvailable")
    public Available addAvailable(@RequestBody Available available) {
        return availableService.submitAvailable(available);
    }

    @GetMapping("/getAllAvailable")
    public List<Available> getAllAvailables() {
        return availableService.fetchAllAvailable();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAvailable(@PathVariable Long id) {
        availableService.deleteAvailable(id);
    }

    @PutMapping("/edit/{id}")
    public Optional<Available> editAvailable(@PathVariable Long id, @RequestBody Available available) {
        return availableService.updateAvailable(id, available);
    }

    @GetMapping("/bookName/{bookName}")
    public List<Available> getAvailableByBookName(@PathVariable String bookName) {
        return availableService.getAvailableByBookName(bookName);
    }

}
