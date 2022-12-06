package com.example.demo.repo;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.showseats;

public interface showseatsrepo extends JpaRepository<showseats, Integer>{
@Query("SELECT * FROM showseats WHERE screennumber=:screennumber")
List<showseats> findByscreennumber(int screennumber);

List<showseats> findAllByscreennumberAndDateAndTimeAndSeatoccupancy(int screennumbner,Date date,String time,int seatoccupancy);
}
