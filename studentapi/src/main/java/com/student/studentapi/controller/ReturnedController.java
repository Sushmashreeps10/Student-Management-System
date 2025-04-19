package com.student.studentapi.controller;

import com.student.studentapi.model.Returned;
import com.student.studentapi.service.ReturnedSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/returned")
@CrossOrigin("*")
public class ReturnedController {

    @Autowired
    private ReturnedSerivce returnedService;

    @PostMapping("/addReturned")
    public Returned addReturned(@RequestBody Returned returned) {
        return returnedService.submitReturned(returned);
    }

    @GetMapping("/getAllReturned")
    public List<Returned> getAllReturned() {
        return returnedService.fetchAllReturned();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReturned(@PathVariable Long id) {
        returnedService.deleteReturned(id);
    }

    @PutMapping("/edit/{id}")
    public Optional<Returned> editReturned(@PathVariable Long id, @RequestBody Returned returned) {
        return returnedService.updateReturned(id, returned);
    }

    @GetMapping("/bookName/{bookName}")
    public List<Returned> getReturnedByBookName(@PathVariable String bookName) {
        return returnedService.getReturnedByBookName(bookName);
    }
}
