package com.example.service.imple;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.repo.*;
import com.example.demo.model.userRegistration;
import com.example.excepion.IdNotFoundException;
import com.example.service.userservice;
@Service
public class userimple implements userservice {
	@Autowired
	UserRepo UserRepo;
	
	@Override
	@ResponseBody
	public List<userRegistration> getAllUsers() {
		return UserRepo.findAll();
	}
	@Override
	public  void save(userRegistration user) {
		UserRepo.save(user);
	}
	
	
	
}
