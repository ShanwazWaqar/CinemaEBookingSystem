package com.example.service;


import com.example.demo.model.userRegistration;
import com.example.excepion.IdNotFoundException;

import java.util.List;

import org.springframework.web.bind.annotation.ResponseBody;

public interface userservice {
	@ResponseBody
	List<userRegistration> getAllUsers();
	public void save(userRegistration user);
	userRegistration getUserById(int id) throws IdNotFoundException;
	userRegistration getUserByemail(String email);
	
}
