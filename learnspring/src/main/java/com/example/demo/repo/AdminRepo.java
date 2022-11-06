package com.example.demo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.AdminRegistration;

@Repository
public interface AdminRepo extends JpaRepository<AdminRegistration,String> {

	List<AdminRegistration> findByemail(String email);
	Boolean existsByEmailAndPassword(String email, String password);
	
}
