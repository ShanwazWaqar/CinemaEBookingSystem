package com.example.controller;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.example.demo.model.MovieEntity;
import com.example.demo.model.promotion;
import com.example.demo.model.showseats;
import com.example.demo.model.showtimes;
import com.example.demo.model.userRegistration;
import com.example.demo.repo.AdminRepo;
import com.example.demo.repo.Movierepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.repo.promotionrepo;
import com.example.demo.repo.scheduling;
import com.example.demo.repo.showseatsrepo;
import com.example.service.AdminService;
import com.example.service.imple.Emailsenderservice;
import com.example.service.imple.userimple;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mysql.cj.jdbc.exceptions.SQLError;


@RestController
@CrossOrigin(origins="http://localhost:4200") 
@RequestMapping("/admin")	
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
	  @Autowired
	  UserRepo Urepo;
	  @Autowired
	  private Movierepo movierepo;
	  @Autowired
	  scheduling schedule;
	  @Autowired
	  showseatsrepo ssrepo;
	  
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
				 
	  
	  @GetMapping(path = "/alladmins") 
	  public ResponseEntity<?> getAdmins() { 

		  return ResponseEntity.status(200).body(as.getAllAdmins());
	  
	  
	  }
	  @GetMapping("getallpromos")
	  public List<promotion> gettpromotions() {
		 List<promotion> promoData = prom.findAll();

			 return promoData;
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
	  @PostMapping("findpromo")
	  public List<promotion> getpromodata(@RequestBody promotion promo){
		  String pcode=promo.getPcode();
		  return prom.findBypcode(pcode);
	  }
	  @PostMapping("/deletepromotion")
	  public boolean deletepromotion(@RequestBody promotion promo) throws SQLException,MessagingException {
		  String promotion="true";
		  List<userRegistration>emails=Urepo.findBypromotion(promotion);
		  int listsize=emails.size();
			String data="Promo Code "+"'"+promo.getPcode()+"'"+" Is no longer valid";
			  for(int i=0;i<listsize;i++) { 
			  emailsenderservice.sendemailwithattachment(emails.get(i).getEmail(),data,"Promotion Expired");  }
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
          PreparedStatement preparedStatement = conn.prepareStatement("UPDATE promotion SET pcode = ?,start=?,end=?,percentage=?,old_pcode=? WHERE old_pcode = ?");
          preparedStatement.setString(1, promo.getPcode());
          preparedStatement.setString(2, promo.getStart());
          preparedStatement.setString(3, promo.getEnd());
          preparedStatement.setDouble(4, promo.getPercentage());
          preparedStatement.setString(5, promo.getPcode());
          preparedStatement.setString(6, promo.getOld_pcode());
          preparedStatement.executeUpdate();
          preparedStatement.close();
		  return true;
	  }
	  @PostMapping("/deleteuser")
	  public boolean deleteuser(@RequestBody userRegistration user) throws SQLException {
		  Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
          PreparedStatement preparedStatement = conn.prepareStatement("DELETE from users WHERE email = ?");
          preparedStatement.setString(1,user.getEmail() );
          preparedStatement.executeUpdate();
          preparedStatement.close();
		  return true;
	  }
	  @PostMapping("/userstatus")
	  public boolean userstatus(@RequestBody userRegistration user) throws SQLException {
		  Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
          PreparedStatement preparedStatement = conn.prepareStatement("UPDATE users SET status = ? WHERE email = ?");
          preparedStatement.setString(1,user.getUserstatus() );
          preparedStatement.setString(2,user.getEmail() );
          preparedStatement.executeUpdate();
          preparedStatement.close();
		  return true;
	  }
	  @PostMapping("/addmovie")
		public boolean addMovie(@RequestBody MovieEntity movieentity) {
		  ResponseEntity.ok(movierepo.save(movieentity));
		 return true;
			 }
	  
	  @PostMapping("/sendpromotion")
	  public boolean sendpromotion(@RequestBody promotion promo) throws SQLException,MessagingException{
		  String promotion="true";
		  List<userRegistration>emails=Urepo.findBypromotion(promotion);
		  int listsize=emails.size();
				String promodata="Use the promotion   "+"'"+promo.getPcode()+"'"+"    to get the discount of "+"'"+promo.getPercentage()+"'"+"   on booking tickets\n\n"+"Promo Starts on : "+promo.getStart()+"\n\n"+"Promo Ends on : "+promo.getEnd();
			  for(int i=0;i<listsize;i++) { 
			  emailsenderservice.sendemailwithattachment(emails.get(i).getEmail()
			  ,promodata,"Promotion from BookMyShow");  }
			 		  Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		  PreparedStatement ps=conn.prepareStatement("UPDATE promotion SET send_promo = ? WHERE pcode = ?");
		  ps.setInt(1,1);
		  ps.setString(2,promo.getPcode());
		  ps.executeUpdate();
		  ps.close();
		  
		  return true;
	  }
	  @PostMapping("/schedulemovie")
	  public boolean schedulemovie(@RequestBody showtimes showtime) throws SQLException {
		  
		  List<showtimes> data=schedule.findAll();
		  DateFormat df = new SimpleDateFormat("yyyy/MM/dd");
		  String date = df.format(showtime.getDate());
		  String time=showtime.getTime();
		  String moviename=showtime.getMoviename();
		  Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		  java.sql.Statement stmt = conn.createStatement();
		  PreparedStatement ps=conn.prepareStatement("UPDATE movies SET currentrunning = 1 WHERE title = ?");
		  ps.setString(1, moviename);
		  ps.executeUpdate();
		  ps.close();
		  int movieid=0;
          ResultSet resultSet = stmt.executeQuery("SELECT id FROM movies WHERE title = "+ "'" + moviename + "'");
while(resultSet.next()) {
        	  movieid = resultSet.getInt("id");
        	  System.out.println(movieid);
}
		  showtime.setMovieid(movieid);
		  int count=0;
		  for(int i=0;i<data.size();i++) {
			 // int srid=Integer.parseInt(moviename);
			 String cdate=df.format(data.get(i).getDate());
			 if(date.equals(cdate) && time.equals(data.get(i).getTime()) && data.get(i).getShowroomid().equals(showtime.getShowroomid())) {
				 count++;
				 System.out.println();
			 }
			
		  }
		  if(count>=1) {
			 return false;
		  }else {
			  schedule.save(showtime);
			  
			  return true;
		  }}
		  @PostMapping("/addseats")
		  public boolean addseats(@RequestBody showseats ss) {
					  ssrepo.save(ss);
//					  PreparedStatement ps2=conn.prepareStatement("INSERT INTO showseats (id,screennumber, seatnumber, date,time) VALUES (?,?, ?, ?,?);");
//					  ps2.setInt(1, showtime.getId());
//					  ps2.setString(2,showtime.getShowroomid());
//					  ps2.setString(3, (seats[i]+seatnum[j]));
//					  ps2.setDate(4,showtime.getDate());
//					  ps2.setString(5, showtime.getTime());
//					  ps2.executeUpdate();
//					  ps2.close();  
				  
			  
		  return true;
		  
	  }
	  @PostMapping("/getmovieinfo")
	  public List<String> getinfo()throws SQLException {
		 Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		 java.sql.Statement stmt = conn.createStatement();
		 String moviename="black panther";
		 ResultSet resultSet = stmt.executeQuery("SELECT title,rating,director,producer,cast,synopsis,category,trailer FROM movies WHERE title = "+ "'" + moviename + "'");
		 List<String> data = new ArrayList<>();
		 String title="";
		 while(resultSet.next()) {
       	  data.add(resultSet.getString("title"));
       	  data.add(resultSet.getString("rating"));
       	  data.add(resultSet.getString("director"));
       	  data.add(resultSet.getString("producer"));
       	  data.add(resultSet.getString("cast"));
       	  data.add(resultSet.getString("synopsis")); 
       	  data.add(resultSet.getString("category"));
       	  data.add(resultSet.getString("trailer"));
}
		 return data;
	  }
	  @PostMapping("/getmoviedetails")
	  public ResponseEntity<MovieEntity>
	  getAccountByNumber(@RequestBody MovieEntity movie ) {
	      String moviename=movie.getTitle();
	      
		  List<MovieEntity> accountData = movierepo.findBytitle(moviename);
		  
		  if (accountData.isEmpty()) { 
			  
			  return new ResponseEntity<MovieEntity>(HttpStatus.NO_CONTENT); }
		  
		  System.out.println(moviename);
		  
		  
		  MovieEntity pqr=accountData.get(0);
		  
		  return new ResponseEntity<MovieEntity>(pqr,
		  HttpStatus.OK);
	  
	  }
	  @PostMapping("/updatemovie")
	  public boolean editmovie(@RequestBody MovieEntity movie)throws SQLException {
		  String title=movie.getTitle();
		  String cast=movie.getCast();
		  String director=movie.getDirector();
		  String producer=movie.getProducer();
		  Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		  
		  return true;
	  }

	  @PostMapping("chnageuserstatus")
	  public boolean Cuserstatus(@RequestBody userRegistration user) throws SQLException,MessagingException{
		  String email=user.getEmail();
		  String userstatus=user.getUserstatus();
		  Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		  PreparedStatement ps=conn.prepareStatement("UPDATE users SET userstatus = ? WHERE email = ?");
		  ps.setString(1, userstatus);
		  ps.setString(2, email);
		  ps.executeUpdate();
		  ps.close();
		  return true;
	  
	  }
	}