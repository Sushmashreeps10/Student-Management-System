package com.student.studentapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.studentapi.model.Returned;
import com.student.studentapi.repository.ReturnedRepository;

@Service
public class ReturnedSerivce {

    @Autowired
    private ReturnedRepository returnedRepository;

    public Returned submitReturned(Returned returned) {
        return returnedRepository.save(returned);
    }

    public List<Returned> fetchAllReturned() {
        return returnedRepository.findAll();
    }

    public void deleteReturned(Long id) {
        returnedRepository.deleteById(id);
    }

    public Optional<Returned> updateReturned(Long id, Returned updateReturned) {
        return returnedRepository.findById(id).map(returned -> {
            returned.setBookName(updateReturned.getBookName());
            returned.setStudentName(updateReturned.getStudentName());
            returned.setRollNo(updateReturned.getRollNo());
            returned.setReturnedDate(updateReturned.getReturnedDate());
            return returnedRepository.save(returned);
        });
    }

    public List<Returned> getReturnedByBookName(String bookName) {
        return returnedRepository.findByBookNameIgnoreCase(bookName);
    }

}
