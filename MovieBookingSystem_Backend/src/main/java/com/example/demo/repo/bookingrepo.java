package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.booking;



public interface bookingrepo extends JpaRepository<booking,Integer>{
	List<booking> findByemail(String email);
}
