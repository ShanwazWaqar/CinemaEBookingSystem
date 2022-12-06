package com.example.controller;

import java.sql.Connection;
import org.springframework.dao.DataIntegrityViolationException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.sql.Date;
import java.sql.Time;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.PaymentCard;
import com.example.demo.model.booking;
import com.example.demo.model.userRegistration;
import com.example.demo.repo.UserRepo;
import com.example.demo.repo.bookingrepo;
import com.example.demo.repo.PaymentRepo;
import com.example.excepion.IdNotFoundException;
import com.example.service.userservice;
import com.example.service.PaymentService;
import com.example.service.imple.Emailsenderservice;
import com.example.service.imple.userimple;
import com.mysql.cj.jdbc.exceptions.SQLError;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Any;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

@RestController
@CrossOrigin(origins="http://localhost:4200") 
@RequestMapping("/api")	

public class UserController {
	@Autowired
	private UserRepo repo;

	  @Autowired 
	  private userservice us;
	  
	  @Autowired 
	  private PaymentRepo paymentRepo;
	  @Autowired 
	  private PaymentService paymentService;
	  @Autowired
	  Emailsenderservice emailsenderservice;
	  @Autowired
	  bookingrepo brepo;
	  
	  
	  @PostMapping("/SignUp")
	  public Map<String, Object> registerUser(@RequestBody userRegistration userRegistration) throws MessagingException, SQLException {
		 Map<String, Object> map = new HashMap<>();
		 System.out.println("Controller called for user Registration "+userRegistration.toString());
		 int max=99999;
		 int min=10000;
		 int rand = (int) Math.floor(Math.random()*(max-min+1)+min);
		 userRegistration.setVerificationcode(Integer.toString(rand));
		 userRegistration.setActivated("False");
		 List<userRegistration> accountData = repo.findByemail(userRegistration.getEmail());
		 if(accountData.isEmpty()) {
			 ResponseEntity.ok(repo.save(userRegistration));
			 String vcode=Integer.toString(rand);
			 System.out.println("data received"+userRegistration.toString());
			 
			 emailsenderservice.sendemailwithattachment(userRegistration.getEmail(),"Please use this Verification code to activate account with bookmyshow : "+vcode,"verificationcode from BookMyShow");
			 map.put("result", "successfully registered");
			 return map;
		 }else {
			 map.put("result", "user already exists");
			 return map;
		 }
			}
	  //verify user email after registration
	  @PostMapping("/verifyuser")
	  public boolean verifyuser(@RequestBody userRegistration userRegistration) {
		  int vcode=0;
		  try {
		 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		 java.sql.Statement stmt = conn.createStatement();
		 
         ResultSet resultSet = stmt.executeQuery("SELECT verificationcode FROM users WHERE email = " + "'" + userRegistration.getEmail() + "'");

         while (resultSet.next()) {
         	vcode=resultSet.getInt("verificationcode"); 
         }
		  } catch (SQLException e) {
	            e.printStackTrace();
	        }
		 String stat="";
		 String vc=userRegistration.getVerificationcode();
		 int vcx=Integer.parseInt(vc);
		 if(vcode == vcx) {
			 stat="Success";
			 userRegistration.setActivated("True");
			 try {
		            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		            PreparedStatement preparedStatement = conn.prepareStatement("UPDATE users SET activated = ? WHERE email = ?");
		            preparedStatement.setString(1,userRegistration.getActivated() );
		            preparedStatement.setString(2, userRegistration.getEmail());
		            preparedStatement.executeUpdate();
		            preparedStatement.close();
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }
			 return true;
		 }else {
			 return false;
		 }	
	  }
	  
	  @PostMapping("/LoginUser")
	  public Map<String,Object> userLogin(@RequestBody userRegistration userRegistration)throws SQLException {
		  Map<String, Object> map = new HashMap<>();
		  boolean res=repo.existsByEmailAndPassword(userRegistration.getEmail(), userRegistration.getPassword());
		  if(res) {
			  int status=0;
			  Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
			  java.sql.Statement stmt = conn.createStatement();
			  ResultSet resultSet = stmt.executeQuery("SELECT userstatus FROM users WHERE email = " + "'" + userRegistration.getEmail() + "'");
		         while (resultSet.next()) {
		         	status=resultSet.getInt("userstatus"); 
		         }
		         if (status==1) {
		        	 map.put("result", "valid");
		        	 return map; 
		         }else {
		        	 map.put("result", "suspended");
		        	 return map;
		         }
	  }else {
		  map.put("result", "Invalid");
		  return map;
	  }
		 }
	  @GetMapping(path = "/allusers") 
	  public ResponseEntity<?> getUsers() { 

		  return ResponseEntity.status(200).body(us.getAllUsers());
	}
	  
	  @PostMapping("/getuserdetails")
	  public ResponseEntity<userRegistration>
	  getAccountByNumber(@RequestBody userRegistration userRegistration ) {
	      String email=userRegistration.getEmail();
		  List<userRegistration> accountData = repo.findByemail(email);
		  
		  if (accountData.isEmpty()) { 
			  
			  return new ResponseEntity<userRegistration>(HttpStatus.NO_CONTENT); }
		  
		  System.out.println(email);
		  
		  
		  userRegistration pqr=accountData.get(0);
		  
		  return new ResponseEntity<userRegistration>(pqr,
		  HttpStatus.OK);
	  
	  }
	@PostMapping("/resendotp")
	public boolean resendotp(@RequestBody userRegistration user)throws MessagingException,SQLException {
		int max=99999;
		 int min=10000;
		 int randx = (int) Math.floor(Math.random()*(max-min+1)+min);
		 String pcode=Integer.toString(randx);
		 emailsenderservice.sendemailwithattachment(user.getEmail(),"Please use this Verification code to verify with bookmyshow : "+pcode,"verificationcode from BookMyShow");
		 Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		 PreparedStatement ps=conn.prepareStatement("UPDATE users SET verificationcode=? WHERE email=?");
		 ps.setString(1, pcode);
		 ps.setString(2, user.getEmail());
		 ps.executeUpdate();
		 ps.close();
		 return true;
	}
	  
	  @PostMapping("/verifyforgotpassword")
	  public boolean verifyforgotpassword(@RequestBody userRegistration user)throws MessagingException {
		  	 int max=99999;
			 int min=10000;
			 int randx = (int) Math.floor(Math.random()*(max-min+1)+min);
			 String pcode=Integer.toString(randx);
			 List<userRegistration> accountData = repo.findByemail(user.getEmail());
			 if(accountData.isEmpty()) {
				 return false;
			 }else {
			 emailsenderservice.sendemailwithattachment(user.getEmail(),"Please use this Verification code to resetpassword with bookmyshow : "+pcode,"verificationcode from BookMyShow");
			 //userRegistration.setPassvercode(code);
			 try {
		            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		            PreparedStatement preparedStatement = conn.prepareStatement("UPDATE users SET passvercode = ? WHERE email = ?");
		            preparedStatement.setString(1, pcode);
		            preparedStatement.setString(2, user.getEmail());
		            preparedStatement.executeUpdate();
		            preparedStatement.close();
		        } catch (SQLException e) {
		            e.printStackTrace();
		   }
			 return true;
			 }
		}
	  //verify forgot password code
	  @PostMapping("/forgotpasswordstat")
	  public boolean frogotpassword(@RequestBody userRegistration userRegistration)throws MessagingException {
		  String vcode="";
		  try {
		 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		 java.sql.Statement stmt = conn.createStatement();
		 
         ResultSet resultSet = stmt.executeQuery("SELECT passvercode FROM users WHERE email = " + "'" + userRegistration.getEmail() + "'");
         while (resultSet.next()) {
         	vcode=resultSet.getString("passvercode"); 
         }
		  } catch (SQLException e) {
	            e.printStackTrace();
	        }
		 String vc=userRegistration.getPassvercode();
		 System.out.println(vc);
		 int pcode=Integer.parseInt(vc);
		 int vcodex=Integer.parseInt(vcode);
		 if(vcodex == pcode) {
				try { 
					Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking","root", ""); 
					PreparedStatement preparedStatement =conn.prepareStatement("UPDATE users SET password = ? WHERE email = ?");
				    preparedStatement.setString(1, userRegistration.getPassword());
				    preparedStatement.setString(2, userRegistration.getEmail());
				    preparedStatement.executeUpdate(); preparedStatement.close(); 
				    } catch(SQLException e) { 
				    	e.printStackTrace(); 
				    	}
			 return true;
		 }else {
			 return false;
		 }
	}
	  //successfully updated forgot password
	  @PostMapping("/fpasssucess")
	  public boolean fpasssucess(@RequestBody userRegistration userRegistration) {
		  
			  try { 
				  Connection conn =DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking","root", ""); 
				  PreparedStatement preparedStatement = conn.prepareStatement("UPDATE users SET password = ? WHERE email = ?");
			  preparedStatement.setString(1, userRegistration.getPassword());
			  preparedStatement.setString(2, userRegistration.getEmail());
			  preparedStatement.executeUpdate(); preparedStatement.close(); 
			  }
			  catch(SQLException e) { 
				  e.printStackTrace(); 
				  }
			 
		  return true;
	  }
	  //After login update password
	  @PostMapping("/updatepassword")
	  public boolean updatepassword(@RequestBody userRegistration userRegistration) {
		  String Status="None";
		  String vcode="";
		  try {
		 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		 java.sql.Statement stmt = conn.createStatement();
		 
         ResultSet resultSet = stmt.executeQuery("SELECT password FROM users WHERE email = " + "'" + userRegistration.getEmail() + "'");
         while (resultSet.next()) {
         	vcode=resultSet.getString("password"); 
         }
		  } catch (SQLException e) {
	            e.printStackTrace();
	        }
		  System.out.println(vcode);
		  
		 String vc=userRegistration.getPassword();
		 System.out.println(vc);
		 if(vcode.equals(vc)) {
			 try {
		            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		            PreparedStatement preparedStatement = conn.prepareStatement("UPDATE users SET password = ? WHERE email = ?");
		            preparedStatement.setString(1, userRegistration.getUpdatedpass());
		            preparedStatement.setString(2, userRegistration.getEmail());
		            preparedStatement.executeUpdate();
		            preparedStatement.close();
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }
			 Status="Successfully updated password";
			 return true;
		 }else {
			 Status="password change unsuccessfull";
			 return false;
		 }
	  }
	  //edit profile after login
	  @PostMapping("/editprofile")
	  public boolean editProfile(@RequestBody userRegistration userRegistration) throws SQLException,MessagingException{
	        int id = userRegistration.getId();
	        String firstname = userRegistration.getFirstname();
	        String lastname=userRegistration.getLastname();
	        String phone = userRegistration.getPhone();
	        String address1 = userRegistration.getAddress1();
	        String address2 = userRegistration.getAddress2();
	        String city = userRegistration.getCity();
	        String state = userRegistration.getState();
	        String country = userRegistration.getCountry();
	        String zipcode = userRegistration.getZipcode();
	        String promotion = userRegistration.getPromotion();
	        String email=userRegistration.getEmail();
	        String cardnumber=userRegistration.getCardnumber();
	        String cardexpirymonth=userRegistration.getCardexpirymonth();
	        String cardexpiryyear=userRegistration.getCardexpiryyear();
	        String nameoncard=userRegistration.getNameoncard();
	        //List<PaymentCard>paydata=userRegistration.getPaymentcard();
	       try {
	            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
	            PreparedStatement preparedStatement = conn.prepareStatement("UPDATE users SET firstname = ?, phone = ?, address1 = ?, address2 = ?, city = ?, state = ?, country = ?, zipcode = ?,promotion = ?, lastname=?,cardnumber=?,cardexpirymonth=?,cardexpiryyear=?,nameoncard=? WHERE email = ?");
	            preparedStatement.setString(1, firstname);
	            preparedStatement.setString(2, phone);
	            preparedStatement.setString(3, address1);
	            preparedStatement.setString(4, address2);
	            preparedStatement.setString(5, city);
	            preparedStatement.setString(6, state);
	            preparedStatement.setString(7, country);
	            preparedStatement.setString(8, zipcode);
	            preparedStatement.setString(9, promotion);
	            preparedStatement.setString(10, lastname);
	            preparedStatement.setString(11, cardnumber);
	            preparedStatement.setString(12, cardexpirymonth);
	            preparedStatement.setString(13, cardexpiryyear);
	            preparedStatement.setString(14, nameoncard);
	            preparedStatement.setString(15, email);
/*	            for(int i=0;i<paydata.size();i++) {
	            PreparedStatement preparedStatement2 = conn.prepareStatement("UPDATE paymentcard SET cardnumber = ?, expirymonth = ?, expiryyear = ?, nameoncard = ? WHERE cardnumber = ?");
	            preparedStatement2.setInt(1,paydata.get(i).getCardnumber());
	            preparedStatement2.setInt(2, paydata.get(i).getExpirymonth());
	            preparedStatement2.setInt(3, paydata.get(i).getExpiryyear());
	            preparedStatement2.setString(4, paydata.get(i).getNameoncard());
	            preparedStatement2.setInt(5, paydata.get(i).getOld_data());
	            preparedStatement2.executeUpdate();
	            preparedStatement2.close();
	            */
	            //java.sql.Statement stmt = conn.createStatement();
	            /*ResultSet resultSet = stmt.executeQuery("SELECT fullname FROM users WHERE fullname = " + "'" + """ + "'");
				//userID = resultSet.getInt("userID");
	            while (resultSet.next()) {
	            	RName=resultSet.getString("Name"); 
	            }*/
	            preparedStatement.executeUpdate();
	            preparedStatement.close();
	        }catch(SQLException exception){
	        	exception.printStackTrace();
	        }
	        emailsenderservice.sendemailwithattachment(email,"Your profile has been succesfully updated","Profile Updated");
return true;
	  }
	  @PostMapping("/sendstatus")
	  public boolean sendstatus(@RequestBody userRegistration userRegistration) {
		  String status="";
		  try {
			 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
			 java.sql.Statement stmt = conn.createStatement();
			 
	         ResultSet resultSet = stmt.executeQuery("SELECT activated FROM users WHERE email = " + "'" + userRegistration.getEmail() + "'");
	         while (resultSet.next()) {
	         	status=resultSet.getString("activated"); 
	         }
			  } catch (SQLException e) {
		            e.printStackTrace();
		        }
	  System.out.println(status);
	  if(status.equals("True")) {
		  return true;
		  }else { return false; }
		 
	  }
	  @PostMapping("/bookticket")
	  public Map<String, Object> bookticket(@RequestBody booking book){
		  Map<String, Object> map = new HashMap<>();
		  map.put("result", "successfully registered");
			 return map;
	  }
	  @PostMapping("/deletecard")
	  public boolean deletecard(@RequestBody PaymentCard pc)throws SQLException {
		  Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		  PreparedStatement ps=conn.prepareStatement("DELETE FROM paymentcard WHERE cardnumber=?");
		  ps.setString(1, pc.getCardnumber());
		  ps.executeUpdate();
		  ps.close();
	  return true;
	  }
	  
	  @GetMapping(path = "/getshowtimes/{movieId}")
		public List<Entry<Date,Time>> showDateAndTime(@PathVariable int movieId) {
			List<Entry<Date,Time>> pairList = new ArrayList<>();
			try {
				Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
				java.sql.Statement stmt = conn.createStatement();
				ResultSet resultSet = stmt.executeQuery("SELECT date,time FROM showtimes WHERE movieid = "+ "'" + movieId + "'");
				while(resultSet.next()) {
					Entry<Date,Time> curTime = new AbstractMap.SimpleEntry<>(resultSet.getDate("date"),resultSet.getTime("time"));
					pairList.add(curTime);
				}
				return pairList;
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			return null;
		}
	  @PostMapping(value="/addpayment")
	  public boolean addcard(@RequestBody PaymentCard pc)  {
		  try {
			    paymentRepo.save(pc);
			    return true;
			} catch (DataIntegrityViolationException e) {
			    return false;
			}
	  
	  }
	 @PostMapping("/retriveCards")
	 public ResponseEntity<?> carddetail(@RequestBody PaymentCard pc) { 

		  return ResponseEntity.status(200).body(paymentRepo.findByemail(pc.getEmail()));
	}
	 @PostMapping("/updatecard")
	 public boolean updatecard(@RequestBody PaymentCard pc)throws SQLException {
		 System.out.println(pc.getOld_data());
		 System.out.println(pc.getNameoncard());
		 Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
		 PreparedStatement preparedStatement = conn.prepareStatement("UPDATE paymentcard SET cardnumber=?,expirymonth=?,expiryyear=?,nameoncard=?,old_data=? WHERE old_data = ?");
         preparedStatement.setString(1, pc.getCardnumber());
         preparedStatement.setInt(2, pc.getExpirymonth());
         preparedStatement.setInt(3, pc.getExpiryyear());
         preparedStatement.setString(4, pc.getNameoncard());
         preparedStatement.setString(5, pc.getCardnumber());
         preparedStatement.setString(6, pc.getOld_data());
         preparedStatement.executeUpdate();
         preparedStatement.close();
         
		 
		 return true;
	 }
	 @PostMapping("/orderhistory")
	  public List<booking> getOrderHistory(@RequestBody userRegistration userRegistration) throws SQLException {
		  return brepo.findByemail(userRegistration.getEmail());
		  
	  }
	  
	  /*
	   * Send email
	   */
	  @PostMapping("/savebooking")
	  public Map<String,Object> saveBooking(@RequestBody booking booking)throws MessagingException,SQLException {
		  Map<String,Object>map=new HashMap<>();
		  if(brepo.existsByDateAndTimeAndScreennumberAndSeatnumbers(booking.getDate(), booking.getTime(), booking.getScreennumber(), booking.getSeatnumbers())) {
			System.out.println("reached If");
			  Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/cinemabooking", "root", "");
				java.sql.Statement stmt = conn.createStatement();
				System.out.println("SELECT orderid FROM bookings WHERE date = "+ "'" + booking.getDate() + "'"+" AND time = "+"'" + booking.getTime() + "'"+" AND screennumber = "+"'" + booking.getScreennumber()+"'"+" AND seatnumbers = "+"'" + booking.getSeatnumbers()+"';");
				ResultSet resultSet = stmt.executeQuery("SELECT orderid FROM bookings WHERE date = "+ "'" + booking.getDate() + "'"+" AND time = "+"'" + booking.getTime() + "'"+" AND screennumber = "+"'" + booking.getScreennumber()+"'"+" AND seatnumbers = "+"'" + booking.getSeatnumbers()+"';");
				while(resultSet.next()) {
					map.put("orderid", resultSet.getInt("orderid"));
					}
			return map;
		  }
		  else{int max=999999999;
			 int min=10000000;
			 int rand = (int) Math.floor(Math.random()*(max-min+1)+min);
			 String orderid=Integer.toString(rand);	
			 emailsenderservice.sendemailwithattachment(booking.getEmail(),"Hola!!! \n Your Booking is confirmed and Here is your order ID "+orderid,"Booking Confirmation");
			 booking.setOrderid(rand);
		     brepo.save(booking);
		     map.put("orderid", orderid);
			  return map;
		  }
		  
		  
	  }
}
