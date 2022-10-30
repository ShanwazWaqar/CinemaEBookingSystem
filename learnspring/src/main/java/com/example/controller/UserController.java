package com.example.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.sql.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
import com.mysql.cj.xdevapi.Statement;


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
		 System.out.println("Controller called for user Registration "+userRegistration.getName());
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
	  @PostMapping("/editprofile")
	    public String editProfile(@RequestBody userRegistration userRegistration) throws SQLException{
	        String Name = userRegistration.getName();
	        //String lastName = user.getLastName();
	        int userID = 0;
	        int id = userRegistration.getId();
	        //String Name = user.getName();
	        String RName="Not Worked";
	        String gender = userRegistration.getGender();
	        String dept = userRegistration.getDept();
	        try {
	            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/geek", "root", "");
	            PreparedStatement preparedStatement = conn.prepareStatement("UPDATE geeksdemo SET id = ?,name = ?, gender = ?, dept = ? WHERE id = ?");
	            preparedStatement.setLong(1, id);
	            preparedStatement.setString(2, Name);
	            preparedStatement.setString(3, gender);
	            preparedStatement.setString(4, dept);
	            preparedStatement.setLong(5, id);
	            preparedStatement.executeUpdate();
	            preparedStatement.close();
	            //RName="Working";
	            System.out.println(Name);
	            java.sql.Statement stmt = conn.createStatement();
	            ResultSet resultSet = stmt.executeQuery("SELECT Name FROM geeksdemo WHERE Name = " + "'" + "Naveen" + "'");
				//userID = resultSet.getInt("userID");
	            while (resultSet.next()) {
				RName=resultSet.getString("Name"); 
	            }
	        }catch(SQLException exception){
	        	exception.printStackTrace();
	        }
	      
	        
	        return RName;
	    }
	  @PostMapping("/updatepassword")
	    public String changePassword(@RequestBody userRegistration userRegistration) {
	        String Name = userRegistration.getName();
	        String dept = userRegistration.getDept();
	        //String encryptedPassword = new BCryptPasswordEncoder().encode(newPassword);
	        try {
	            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/geek", "root", "");
	            java.sql.Statement stmt = conn.createStatement();
	            String query = "UPDATE geeksdemo SET dept = '" + dept + "'" + " WHERE Name = '" +Name + "'";
	            stmt.executeUpdate(query);
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	        return "Successfully updated password";
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
