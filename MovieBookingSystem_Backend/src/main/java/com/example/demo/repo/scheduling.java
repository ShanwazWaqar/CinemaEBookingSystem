package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.showtimes;

public interface scheduling extends JpaRepository<showtimes, Integer> {
	
//	@Query("SELECT moviename from showtimes")
//	List<showtimes> findByid(int id);
	
}
