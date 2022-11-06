package com.example.demo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.userRegistration;

@Repository
public interface UserRepo extends JpaRepository<userRegistration,String> {

	List<userRegistration> findByid(int id);
	Boolean existsByEmailAndPassword(String email, String password);
	List<userRegistration> findByemail(String email);
	
}
