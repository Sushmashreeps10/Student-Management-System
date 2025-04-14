package com.student.studentapi.service;

import com.student.studentapi.model.Student;
import com.student.studentapi.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public Student submitStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> fetchAllStudent() {
        return studentRepository.findAll();
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Optional<Student> updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setRollNo(updatedStudent.getRollNo());
            student.setBranch(updatedStudent.getBranch());
            student.setYear(updatedStudent.getYear());
            return studentRepository.save(student);
        });
    }

    public List<Student> getStudentsByBranch(String branch) {
        return studentRepository.findByBranchIgnoreCase(branch);
    }
    
}
