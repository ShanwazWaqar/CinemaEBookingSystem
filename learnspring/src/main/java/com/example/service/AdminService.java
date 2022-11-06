package com.example.service;


import com.example.demo.model.AdminRegistration;
import com.example.excepion.IdNotFoundException;

import java.util.List;

import org.springframework.web.bind.annotation.ResponseBody;

public interface AdminService {
	@ResponseBody
	List<AdminRegistration> getAllAdmins();
	public void save(AdminRegistration admin);
	//AdminRegistration getAdminById(int id) throws IdNotFoundException;
	
}