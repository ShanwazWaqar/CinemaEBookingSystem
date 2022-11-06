package com.example.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import javax.mail.MessagingException;

import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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

import com.example.demo.model.AdminRegistration;
import com.example.demo.model.promotion;
import com.example.demo.model.userRegistration;
import com.example.demo.repo.AdminRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.repo.promotionrepo;
import com.example.service.AdminService;
import com.example.service.imple.Emailsenderservice;
import com.example.service.imple.userimple;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mysql.cj.jdbc.exceptions.SQLError;


@RestController
@CrossOrigin(origins="http://localhost:4200") 
@RequestMapping("/adm")	
public class AdminController {
	@Autowired
	private AdminRepo repo;

	
	  @Autowired 
	  private AdminService as;
	  
	  
	  @Autowired
	  UserRepo ur;
	  
	  @Autowired
	  Emailsenderservice emailsenderservice;
	  
	  @Autowired
	  promotionrepo prom;
	  
	 
	
	  
	  @PostMapping("/admin")
	  public ResponseEntity<AdminRegistration> registerUser(@RequestBody AdminRegistration AdminRegistration) {
		 //logger.info("Received controller");
		 System.out.println("Controller called for user Registration "+AdminRegistration.toString());
		 return ResponseEntity.ok(repo.save(AdminRegistration));
	  }
	  
	  @PostMapping("/adminlogin")
	  public ResponseEntity<Boolean> adminLogin(@RequestBody AdminRegistration AdminRegistration) {
		 return ResponseEntity.ok(repo.existsByEmailAndPassword(AdminRegistration.getEmail(), AdminRegistration.getPassword()));
	  }
	  @PostMapping("/newadmin")
	  public boolean newadmin(@RequestBody AdminRegistration AdminRegistration) throws MessagingException{
		  List<AdminRegistration> accountData = repo.findByemail(AdminRegistration.getEmail());
			 if(accountData.isEmpty()) {
				 List<userRegistration> accountData2 = ur.findByemail(AdminRegistration.getEmail()); 
				 if(accountData.isEmpty()) {
					 repo.save(AdminRegistration);
					 emailsenderservice.sendemailwithattachment(AdminRegistration.getEmail(),"Registered as admin succesfully","admin registration");
					 return true;
				 }
				 else {
					 return false;
				 }
				 }else {
					 return false;
				 }
			 }
				 
		  
	  
	  
	  // only admins have rights to inspect all users data
	  
	  @GetMapping(path = "/alladmins") 
	  public ResponseEntity<?> getAdmins() { 
		// get all users, returns empty list if user table is empty

		  return ResponseEntity.status(200).body(as.getAllAdmins());
	  
	  
	  }
	  @PostMapping("/addpromotion")
	  public boolean addpromotion(@RequestBody promotion promo) {
		 List<promotion> promoData = prom.findBypcode(promo.getPcode());
			 if(promoData.isEmpty()) {
				 prom.save(promo);
				 return true;
			 }else {
				 return false;
			 }
		}
	  @PostMapping("/deletepromotion")
	  public boolean deletepromotion(@RequestBody promotion promo) throws SQLException {
		  Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
          PreparedStatement preparedStatement = conn.prepareStatement("DELETE FROM promotion WHERE pcode = ?");
          preparedStatement.setString(1, promo.getPcode());
          preparedStatement.executeUpdate();
          preparedStatement.close();
		  return true;
	  }
	  @PostMapping("/updatepromotion")
	  public boolean modifypromotion(@RequestBody promotion promo) throws SQLException {
		  Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
          PreparedStatement preparedStatement = conn.prepareStatement("UPDATE promotion SET pcode = ?,start=?,end=?,percentage=? WHERE old_pcode = ?");
          preparedStatement.setString(1, promo.getPcode());
          preparedStatement.setString(2, promo.getStart());
          preparedStatement.setString(3, promo.getEnd());
          preparedStatement.setDouble(4, promo.getPercentage());
          preparedStatement.setString(5, promo.getOld_pcode());
          preparedStatement.executeUpdate();
          preparedStatement.close();
		  return true;
	  }
	}