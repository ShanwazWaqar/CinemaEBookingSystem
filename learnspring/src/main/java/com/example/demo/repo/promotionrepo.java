package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.promotion;

public interface promotionrepo extends JpaRepository<promotion,Integer> {

	List<promotion> findBypcode(String pcode);

}
