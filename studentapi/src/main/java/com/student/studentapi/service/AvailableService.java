package com.student.studentapi.service;

import org.springframework.stereotype.Service;

import com.student.studentapi.model.Available;
import com.student.studentapi.model.Borrowed;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.student.studentapi.repository.AvailableRepository;

@Service
public class AvailableService {

    @Autowired
    private AvailableRepository availableRepository;

    public Available submitAvailable(Available available) {
        return availableRepository.save(available);
    }

    public List<Available> fetchAllAvailable() {
        return availableRepository.findAll();
    }

    public void deleteAvailable(Long id) {
        availableRepository.deleteById(id);
    }

    public Optional<Available> updateAvailable(Long id, Available updateAvailable) {
        return availableRepository.findById(id).map(available -> {
            available.setBookName(updateAvailable.getBookName());
            available.setquantity(updateAvailable.getquantity());
            available.setshelf(updateAvailable.getshelf());
            return availableRepository.save(available);
        });
    }

    public List<Available> getAvailableByBookName(String bookName) {
        return availableRepository.findByBookNameIgnoreCase(bookName);
    }
}