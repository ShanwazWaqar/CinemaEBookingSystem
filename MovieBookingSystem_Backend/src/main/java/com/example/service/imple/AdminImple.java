package com.example.service.imple;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.repo.*;
import com.example.demo.model.AdminRegistration;
import com.example.demo.model.userRegistration;
import com.example.excepion.IdNotFoundException;
import com.example.service.AdminService;

@Service
public class AdminImple implements AdminService {
	@Autowired
	AdminRepo AdminRepo;

	@Override
	@ResponseBody
	public List<AdminRegistration> getAllAdmins() {
		return AdminRepo.findAll();
	}

	@Override
	public void save(AdminRegistration admin) {
		AdminRepo.save(admin);
	}
	/*
	 * @Override
	 * 
	 * @ResponseBody public AdminRegistration getAdminById(int id) throws
	 * IdNotFoundException { List<AdminRegistration> admin = AdminRepo.findByid(id);
	 * if (admin.isEmpty()) throw new IdNotFoundException("Sorry user with " + id +
	 * " not found!"); return admin.get(0); }
	 */

}
