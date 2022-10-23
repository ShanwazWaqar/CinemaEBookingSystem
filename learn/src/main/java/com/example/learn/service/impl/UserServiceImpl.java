package com.example.learn.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.learn.Repository.UserRepo;
import com.example.learn.entity.userdata;
import com.example.learn.service.userservice;
@Service
public class UserServiceImpl implements userservice{
	@Autowired
	UserRepo UserRepo;
	
	@Override
	public List<userdata> getAllUsers() {
		return UserRepo.findAll();
	}
}
