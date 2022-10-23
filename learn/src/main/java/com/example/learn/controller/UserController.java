package com.example.learn.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.example.learn.Repository;
import com.example.learn.entity.userdata;

//import com.example.learn.Repository.UserRepo;
import com.example.learn.service.userservice;
@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")	
public class UserController {
	//@Autowired
	//private UserRepo repo;
	@Autowired
	userservice userservice; 
	
	//@PostMapping("/user")
	//public ResponseEntity<userdata> registerUser(@RequestBody userdata udata) {
	  //  System.out.println(repo.toString() + " data");
		//return ResponseEntity.ok(repo.save(udata));
//}
	@GetMapping(path = "/allusers")
	public ResponseEntity<?> getUsers() {
		// get all users, returns empty list if user table is empty
		try {
			List <userdata> data=userservice.getAllUsers();
			return ResponseEntity.status(200).body(data);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return (ResponseEntity<?>) ResponseEntity.status(404);

	}}

