package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.booking;

public interface bookingrepo extends JpaRepository<booking,Integer>{

}
