package com.example.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.userRegistration;
import com.example.demo.repo.UserRepo;
import com.example.service.userservice;
import com.example.service.imple.userimple;


@RestController
@CrossOrigin(origins="http://localhost:4200") 
@RequestMapping("/api")	
public class UserController {
	@Autowired
	private UserRepo repo;

	
	  @Autowired 
	  private userservice us;
	  
	  @PostMapping("/user")
		public ResponseEntity<userRegistration> registerUser(@RequestBody userRegistration userRegistration) {
		 //logger.info("Received controller");
		 System.out.println("Controller called for user Registration "+userRegistration.toString());
		 return ResponseEntity.ok(repo.save(userRegistration));
			
			
		}
	  
	  // only admins have rights to inspect all users data
	  
	  @GetMapping(path = "/allusers") 
	  public ResponseEntity<?> getUsers() { 
		// get all users, returns empty list if user table is empty

	  return ResponseEntity.status(200).body(us.getAllUsers());
	  
	  
	  }
	  
	  @GetMapping("/{id}")
	  public ResponseEntity<List<userRegistration>>
	  getAccountByNumber(@PathVariable("id") int id) {
	  
	  
	  
	  List<userRegistration> accountData = repo.findByid(id);
	  
	  if (accountData.isEmpty()) { 
		  
		  return new ResponseEntity<List<userRegistration>>(HttpStatus.NO_CONTENT); }
	  
	  System.out.println(id);
	  
	  
	  userRegistration pqr=accountData.get(0);
	  
	  return new ResponseEntity<List<userRegistration>>(accountData,
	  HttpStatus.OK);
	  
	  }
	  }
	  
	/*
	 * @RequestMapping("/home") public String test() { return "Works!"; }
	 * 
	 * 
	 * @GetMapping("/users")
	 * 
	 * @ResponseBody public String listAll(Model model) { List<userRegistration>
	 * listUsers = repo.findAll(); model.addAttribute("listUsers", listUsers);
	 * return listUsers; }
	 * 
	 * }
	 */
