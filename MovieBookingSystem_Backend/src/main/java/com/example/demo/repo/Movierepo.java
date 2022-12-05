package com.example.demo.repo;


import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.MovieEntity;
import com.example.demo.model.userRegistration;


@Repository
public interface Movierepo extends JpaRepository<MovieEntity,String> {

	List<MovieEntity> findBytitle(String moviename);
	List<MovieEntity> findAll();
 //List<MovieEntity>findidBymoviename(String moviename);
}