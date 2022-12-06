package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@ToString
@Table(name="bookings")
public class booking {
	@Id
	@GeneratedValue
	private int bid;
	private String title;
	private String email;
	private String date;
	private String time;
	private String screennumber;
	private String numberoftcikets;
	private String adultseats;
	private String childseats;
	private String seniorseats;
	private String cardnumber;
	private String totalamount;
	private String seatnumbers;	
	private int orderid;
	
	public booking() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public booking(int bid, String title, String email, String date, String time, String screennumber,
			String numberoftcikets, String adultseats, String childseats, String seniorseats, String cardnumber,
			String totalamount, String seatnumbers,int orderid) {
		super();
		this.bid = bid;
		this.title = title;
		this.email = email;
		this.date = date;
		this.time = time;
		this.screennumber = screennumber;
		this.numberoftcikets = numberoftcikets;
		this.adultseats = adultseats;
		this.childseats = childseats;
		this.seniorseats = seniorseats;
		this.cardnumber = cardnumber;
		this.totalamount = totalamount;
		this.seatnumbers = seatnumbers;
		this.orderid=orderid;
	}


	public int getOrderid() {
		return orderid;
	}



	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}



	@Override
	public String toString() {
		return "booking [bid=" + bid + ", title=" + title + ", email=" + email + ", date=" + date + ", time=" + time
				+ ", screennumber=" + screennumber + ", numberoftcikets=" + numberoftcikets + ", adultseats="
				+ adultseats + ", childseats=" + childseats + ", seniorseats=" + seniorseats + ", cardnumber="
				+ cardnumber + ", totalamount=" + totalamount + ", seatnumbers=" + seatnumbers + "]";
	}



	public int getBid() {
		return bid;
	}


	public void setBid(int bid) {
		this.bid = bid;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	public String getTime() {
		return time;
	}


	public void setTime(String time) {
		this.time = time;
	}

	
	
	public String getScreennumber() {
		return screennumber;
	}



	public void setScreennumber(String screennumber) {
		this.screennumber = screennumber;
	}



	public String getNumberoftcikets() {
		return numberoftcikets;
	}



	public void setNumberoftcikets(String numberoftcikets) {
		this.numberoftcikets = numberoftcikets;
	}



	public String getAdultseats() {
		return adultseats;
	}



	public void setAdultseats(String adultseats) {
		this.adultseats = adultseats;
	}



	public String getChildseats() {
		return childseats;
	}



	public void setChildseats(String childseats) {
		this.childseats = childseats;
	}



	public String getSeniorseats() {
		return seniorseats;
	}



	public void setSeniorseats(String seniorseats) {
		this.seniorseats = seniorseats;
	}



	public String getCardnumber() {
		return cardnumber;
	}



	public void setCardnumber(String cardnumber) {
		this.cardnumber = cardnumber;
	}



	public String getTotalamount() {
		return totalamount;
	}



	public void setTotalamount(String totalamount) {
		this.totalamount = totalamount;
	}



	public String getSeatnumbers() {
		return seatnumbers;
	}


	public void setSeatnumbers(String seatnumbers) {
		this.seatnumbers = seatnumbers;
	}
	
	
}