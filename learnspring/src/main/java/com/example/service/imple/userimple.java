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
	@ResponseBody
	public userRegistration getUserById(int id) throws IdNotFoundException {
		List<userRegistration> user = UserRepo.findByid(id);
		if (user.isEmpty())
			throw new IdNotFoundException("Sorry user with " + id + " not found!");
		return user.get(0);
	}
	/*@Override
	@ResponseBody
	public userRegistration (String email) {
		return UserRepo.;
	}*/
	@Override
	public  void save(userRegistration user) {
		UserRepo.save(user);
	}
	@Override
	public userRegistration getUserByemail(String email) {
		// TODO Auto-generated method stub
		List<userRegistration> user = UserRepo.findByemail(email);
		return user.get(0);
	}
	
	
	
	
}
